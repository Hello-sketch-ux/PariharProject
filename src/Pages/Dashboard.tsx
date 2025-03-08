import React from 'react';
import { ShoppingBag, Truck, Users, Star, Award, Package } from 'lucide-react';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
}

interface DashboardProps {
  userData: UserData;
}

const Dashboard: React.FC<DashboardProps> = ({ userData }) => {
  return (
    <div className="w-full min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-10 overflow-x-hidden">
      {/* <div className="max-w-7xl mx-auto"> */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Welcome{userData.firstName ? `, ${userData.firstName}` : ' to Parihar India'}
        </h1>
        <p className="mt-2 text-lg text-white">Your trusted partner for quality products and services</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        <div className="bg-gray-900 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <ShoppingBag className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-green-500 truncate">Total Orders</dt>
                  <dd>
                    <div className="text-lg font-medium text-green-500">12,345</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-green-500 truncate">Deliveries</dt>
                  <dd>
                    <div className="text-lg font-medium text-green-500">11,983</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-white rounded-md p-3">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-green-500 truncate">Happy Customers</dt>
                  <dd>
                    <div className="text-lg font-medium text-green-500">10,000+</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 shadow overflow-hidden sm:rounded-lg mb-10">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-white">About Parihar India</h3>
          <p className="mt-1 max-w-2xl text-sm text-white">Learn more about our company and services</p>
        </div>
        <div className="border-t border-black">
          <div className="bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <div className="text-sm font-medium text-white">Our Mission</div>
            <div className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
              To provide high-quality products and exceptional customer service to our valued customers across India.
            </div>
          </div>
          <div className="bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <div className="text-sm font-medium text-white">Established</div>
            <div className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">2010</div>
          </div>
          <div className="bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <div className="text-sm font-medium text-white">Headquarters</div>
            <div className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">New Delhi, India</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-white">Our Services</h3>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-700 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 ">
                <div className="flex items-center mb-4 ">
                  <Package className="h-8 w-8 text-green-500 mr-3" />
                  <h4 className="text-lg font-medium text-white">Quality Products</h4>
                </div>
                <p className="text-sm text-white">
                  We offer a wide range of high-quality products that meet international standards.
                </p>
              </div>
            </div>
            <div className="bg-gray-700 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center mb-4">
                  <Truck className="h-8 w-8 text-blue-500 mr-3" />
                  <h4 className="text-lg font-medium text-white">Fast Delivery</h4>
                </div>
                <p className="text-sm text-white">
                  We ensure quick and reliable delivery of products to your doorstep.
                </p>
              </div>
            </div>
            <div className="bg-gray-700 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center mb-4">
                  <Star className="h-8 w-8 text-yellow-500 mr-3" />
                  <h4 className="text-lg font-medium text-white">Customer Support</h4>
                </div>
                <p className="text-sm text-white">
                  Our dedicated customer support team is available 24/7 to assist you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;