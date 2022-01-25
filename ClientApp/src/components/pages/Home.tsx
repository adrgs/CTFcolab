import * as React from 'react';
import { Link } from 'react-router-dom';
import i18n from '../../services/i18n';

const Home = () => (
  <>
    <div className="flex relative z-20 items-center">
      <div className="container mx-auto px-6 p-6 flex flex-col justify-between items-center relative py-8 bg-white dark:bg-gray-800 ">
        <div className="flex flex-col">
          <h1 className="font-light w-full uppercase text-center text-4xl sm:text-5xl dark:text-white text-gray-800">
            {i18n.t("home_title")}
          </h1>
          <h2 className="font-light max-w-2xl mx-auto w-full text-xl dark:text-white text-gray-500 text-center py-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis, enim vel fringilla consequat, ligula nunc vulputate dui, nec lobortis metus erat eget diam. Suspendisse in tristique metus, blandit convallis tortor. Nunc mollis luctus ultrices. Nunc bibendum metus magna, quis malesuada orci luctus at. Ut id quam nec elit tempor porta. Cras ultrices id nisi et placerat. Phasellus ac urna et eros imperdiet tristique. Mauris laoreet neque ac erat hendrerit, sit amet vestibulum elit gravida. In gravida placerat ipsum, nec feugiat elit.
          </h2>
          <div className="flex items-center justify-center mt-4">
            <Link to="/login" className="uppercase py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-md mr-4 hover:bg-gray-900">
              {i18n.t("login")}
            </Link>
            <Link to="/signup" className="uppercase py-2 px-4 bg-transparent border-2 border-gray-800 text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md">
              {i18n.t("sign_up")}
            </Link>
          </div>
        </div>
        <div className="block w-full mx-auto mt-6 relative">
          <img src="/img/logo-vertical.png" className="max-w-xs md:max-w-l m-auto" />
        </div>
      </div>
    </div>
    <div className="container mx-auto px-6 p-6 bg-white dark:bg-gray-800">
      <div className="mb-16 text-center">
        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
          {i18n.t("features")}
        </h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {i18n.t("features_subtitle")}
        </p>
      </div>
      <div className="flex flex-wrap my-12 dark:text-white">
        <div className="w-full border-b md:w-1/2 md:border-r lg:w-1/3 p-8">
          <div className="flex items-center mb-6">
            <svg width="20" height="20" fill="currentColor" className="h-6 w-6 text-indigo-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
              <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
              </path>
            </svg>
            <div className="ml-4 text-xl">
              Lorem ipsum
            </div>
          </div>
          <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis, enim vel fringilla consequat, ligula nunc vulputate dui, nec lobortis metus erat eget diam.
          </p>
        </div>
        <div className="w-full border-b md:w-1/2 lg:w-1/3 lg:border-r p-8">
          <div className="flex items-center mb-6">
            <svg width="20" height="20" fill="currentColor" className="h-6 w-6 text-indigo-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
              <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
              </path>
            </svg>
            <div className="ml-4 text-xl">
              Lorem ipsum
            </div>
          </div>
          <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis, enim vel fringilla consequat, ligula nunc vulputate dui, nec lobortis metus erat eget diam.
          </p>
        </div>
        <div className="w-full border-b md:w-1/2 md:border-r lg:w-1/3 lg:border-r-0 p-8">
          <div className="flex items-center mb-6">
            <svg width="20" height="20" fill="currentColor" className="h-6 w-6 text-indigo-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
              <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
              </path>
            </svg>
            <div className="ml-4 text-xl">
              Lorem ipsum
            </div>
          </div>
          <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis, enim vel fringilla consequat, ligula nunc vulputate dui, nec lobortis metus erat eget diam.
          </p>
        </div>
        <div className="w-full border-b md:w-1/2 lg:w-1/3 lg:border-r lg:border-b-0 p-8">
          <div className="flex items-center mb-6">
            <svg width="20" height="20" fill="currentColor" className="h-6 w-6 text-indigo-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
              <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
              </path>
            </svg>
            <div className="ml-4 text-xl">
              Lorem ipsum
            </div>
          </div>
          <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis, enim vel fringilla consequat, ligula nunc vulputate dui, nec lobortis metus erat eget diam.
          </p>
        </div>
        <div className="w-full border-b md:w-1/2 md:border-r md:border-b-0 lg:w-1/3 lg:border-b-0 p-8">
          <div className="flex items-center mb-6">
            <svg width="20" height="20" fill="currentColor" className="h-6 w-6 text-indigo-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
              <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
              </path>
            </svg>
            <div className="ml-4 text-xl">
              Lorem ipsum
            </div>
          </div>
          <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis, enim vel fringilla consequat, ligula nunc vulputate dui, nec lobortis metus erat eget diam.
          </p>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-8">
          <div className="flex items-center mb-6">
            <svg width="20" height="20" fill="currentColor" className="h-6 w-6 text-indigo-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
              <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
              </path>
            </svg>
            <div className="ml-4 text-xl">
              Lorem ipsum
            </div>
          </div>
          <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis, enim vel fringilla consequat, ligula nunc vulputate dui, nec lobortis metus erat eget diam.
          </p>
        </div>
      </div>
    </div>

  </>
);

export default Home;
