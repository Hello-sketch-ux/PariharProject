import { useEffect, useRef, useState } from "react";

export default function RestroomFinder() {
  // Refs
  const mapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const directionsService = useRef<google.maps.DirectionsService | null>(null);
  const directionsRenderer = useRef<google.maps.DirectionsRenderer | null>(null);
  const restroomMarkersRef = useRef<google.maps.Marker[]>([]);

  // State
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchedLocation, setSearchedLocation] = useState<google.maps.LatLng | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load Google Maps script
  useEffect(() => {
    if (window.google?.maps) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBrim6Wa_pmYXf8bU9giZcIMF7tflp3Pks&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => {
      console.error("Google Maps script failed to load");
      setIsScriptLoaded(false);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Initialize map when script is loaded
  useEffect(() => {
    if (isScriptLoaded && mapRef.current && !map) {
      initMap();
    }
  });

  function initMap() {
    if (!window.google?.maps || !mapRef.current) return;

    const initialLocation = new google.maps.LatLng(20.5937, 78.9629);
    const newMap = new google.maps.Map(mapRef.current, {
      center: initialLocation,
      zoom: 5,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: true,
    });

    setMap(newMap);

    directionsService.current = new google.maps.DirectionsService();
    directionsRenderer.current = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: "#4285F4",
        strokeOpacity: 0.8,
        strokeWeight: 4,
      },
    });
    directionsRenderer.current.setMap(newMap);

    setupSearchBox(newMap);
  }

  function setupSearchBox(mapInstance: google.maps.Map) {
    if (!inputRef.current) return;

    const searchBox = new google.maps.places.SearchBox(inputRef.current);

    const boundsChangedListener = mapInstance.addListener("bounds_changed", () => {
      searchBox.setBounds(mapInstance.getBounds() as google.maps.LatLngBounds);
    });

    const placesChangedListener = searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (!places || places.length === 0) return;

      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      clearRestroomMarkers();
      directionsRenderer.current?.setDirections(null);

      const place = places[0];
      if (!place.geometry?.location) {
        console.error("Place has no geometry location");
        return;
      }

      setSearchedLocation(place.geometry.location);

      // Create new marker for searched location
      markerRef.current = new google.maps.Marker({
        map: mapInstance,
        position: place.geometry.location,
        title: place.name,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        },
      });

      mapInstance.setCenter(place.geometry.location);
      mapInstance.setZoom(15);
    });

    // Cleanup function for listeners if component unmounts or map changes
    return () => {
      google.maps.event.removeListener(boundsChangedListener);
      google.maps.event.removeListener(placesChangedListener);
    };
  }

  function clearRestroomMarkers() {
    restroomMarkersRef.current.forEach((marker) => marker.setMap(null));
    restroomMarkersRef.current = [];
  }

  const searchPlaces = (
    service: google.maps.places.PlacesService,
    request: google.maps.places.PlaceSearchRequest
  ): Promise<google.maps.places.PlaceResult[]> => {
    return new Promise((resolve, reject) => {
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          resolve(results);
        } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          resolve([]);
        } else {
          reject(new Error(`Places search failed: ${status}`));
        }
      });
    });
  };

  const findRestrooms = async () => {
    if (!searchedLocation || !map) {
      alert("Please enter and select a location first.");
      return;
    }

    setIsLoading(true);
    clearRestroomMarkers();

    const service = new google.maps.places.PlacesService(map);

    try {
      const [restrooms, malls, restaurants] = await Promise.all([
        searchPlaces(service, {
          location: searchedLocation,
          radius: 500,
          keyword: "restroom",
        }),
        searchPlaces(service, {
          location: searchedLocation,
          radius: 500,
          type: "shopping_mall",
        }),
        searchPlaces(service, {
          location: searchedLocation,
          radius: 500,
          type: "restaurant",
        }),
      ]);

      const allPlaces = [...restrooms, ...malls, ...restaurants];

      if (allPlaces.length === 0) {
        alert("No restrooms, malls, or restaurants found nearby.");
        setIsLoading(false);
        return;
      }

      allPlaces.forEach((place) => {
        if (!place.geometry?.location) return;

        let iconUrl = "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
        let labelText = "R";
        let description = "Public restroom";

        if (place.types?.includes("shopping_mall")) {
          iconUrl = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
          labelText = "M";
          description = "This mall likely has restrooms available.";
        } else if (place.types?.includes("restaurant")) {
          iconUrl = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
          labelText = "T";
          description = "This restaurant likely has restrooms available.";
        }

        const marker = new google.maps.Marker({
          position: place.geometry.location,
          map,
          title: place.name || description,
          icon: {
            url: iconUrl,
          },
          label: {
            text: labelText,
            color: "white",
            fontWeight: "bold",
          },
        });

        const location = place.geometry?.location;
        if (!location) {
          console.error("Place has no location, skipping marker click listener");
          return;
        }

        marker.addListener("click", () => {
          const infoWindow = new google.maps.InfoWindow({
            content: `
      <div style="min-width: 200px;">
        <h3>${place.name || labelText}</h3>
        <p>${description}</p>
      </div>
    `,
            position: location,
          });
          infoWindow.open(map, marker);
          if (!place.geometry || !place.geometry.location) return;

          showDistanceAndDirections(place.geometry.location, place.name || labelText);
        });


        restroomMarkersRef.current.push(marker);
      });
    } catch (error) {
      console.error("Error finding places:", error);
      alert(error instanceof Error ? error.message : "Failed to find places");
    } finally {
      setIsLoading(false);
    }
  };

  const showDistanceAndDirections = (
    destination: google.maps.LatLng,
    destinationName: string
  ) => {
    if (!searchedLocation || !map) return;

    const distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix(
      {
        origins: [searchedLocation],
        destinations: [destination],
        travelMode: google.maps.TravelMode.WALKING,
      },
      (response, status) => {
        if (status !== "OK" || !response) {
          console.error("Distance Matrix request failed:", status);
          return;
        }

        const element = response.rows[0].elements[0];
        if (element.status !== "OK") {
          console.error("Distance Matrix element error:", element.status);
          return;
        }

        const distance = element.distance.text;
        const duration = element.duration.text;

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; min-width: 200px;">
              <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #333;">${destinationName}</h3>
              <p style="margin: 5px 0; color: #555;">Distance: ${distance}</p>
              <p style="margin: 5px 0; color: #555;">Walking time: ${duration}</p>
              <button id="direction-button" style="
                margin-top: 10px;
                padding: 8px 12px;
                background: #4285F4;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                width: 100%;
              ">Show Directions</button>
            </div>
          `,
          position: destination,
        });

        infoWindow.open(map);

        google.maps.event.addListenerOnce(infoWindow, "domready", () => {
          const directionButton = document.getElementById("direction-button");
          if (directionButton) {
            directionButton.onclick = () => {
              displayRoute(destination);
              infoWindow.close();
            };
          }
        });
      }
    );
  };

  const displayRoute = (destination: google.maps.LatLng) => {
    if (!searchedLocation || !directionsService.current || !directionsRenderer.current || !map) return;

    directionsRenderer.current.setDirections(null);
    directionsService.current.route(
      {
        origin: searchedLocation,
        destination,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          directionsRenderer.current?.setDirections(result);
          // Fit map to route bounds
          if (result.routes[0].bounds) {
            map.fitBounds(result.routes[0].bounds);
          }
        } else {
          console.error("Directions request failed:", status);
        }
      }
    );
  };

  return (
  <div className="w-screen h-screen flex flex-col relative">
    <header className="flex flex-col md:flex-row justify-between items-center bg-black text-white p-4 sticky top-0 z-10">
      <h1 className="text-base md:text-2xl font-semibold text-center max-w-full mb-2 md:mb-0">
        Find A Restroom Certified By Parihar India
      </h1>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter your location"
        className="bg-zinc-800 text-white rounded-full px-4 py-2 w-full max-w-md focus:outline-white"
        style={{ minWidth: 0 }}
      />
    </header>
    <div ref={mapRef} className="flex-1 w-full" id="map" />
    <button
      onClick={findRestrooms}
      disabled={!searchedLocation || isLoading}
      className={`fixed bottom-5 left-7 transform -translate-x-1/2 md:left-[40vw] md:translate-x-0 px-6 py-3 text-white rounded-full shadow-md transition-colors z-20 focus:outline-none text-sm md:text-base ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-green-600"
        }`}
      style={{ minWidth: 160 }}
    >
      {isLoading ? "Searching..." : "Show Certified Restrooms"}
    </button>

    {/* Legend Box - fixed at bottom right */}
    {/* Legend Box - fixed bottom right, responsive size and style */}
<div
  className="fixed bottom-20 right-4 md:bottom-5 md:right-5 bg-white bg-opacity-95 rounded-lg shadow-lg p-3 md:p-4 w-36 md:w-48 text-xs md:text-sm z-20 border border-gray-300"
  style={{ backdropFilter: "saturate(180%) blur(10px)" }}
>
  <h4 className="font-semibold mb-2 text-gray-900">Restroom</h4>
  <div className="flex items-center mb-2">
    <div
      className="w-5 h-5 rounded-full mr-3"
      style={{ backgroundColor: "green" }}
    />
    <span className="leading-tight text-gray-800">Public Restroom</span>
  </div>
  <div className="flex items-center mb-2">
    <div
      className="w-5 h-5 rounded-full mr-3"
      style={{ backgroundColor: "blue" }}
    />
    <span className="leading-tight text-gray-800">Mall Restroom</span>
  </div>
  <div className="flex items-center">
    <div
      className="w-5 h-5 rounded-full mr-3"
      style={{ backgroundColor: "red" }}
    />
    <span className="leading-tight text-gray-800">Restaurant Restroom</span>
  </div>
</div>

  </div>
);

}
