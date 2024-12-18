"use client"

import React from 'react'
import { RxAvatar } from "react-icons/rx";
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import { useState } from 'react';
import Events from '@components/All_Event/Events';
import { useEffect } from 'react';
import { useRouter } from '@node_modules/next/navigation';
import Loading from '@components/Loading/Loading';
import events from '@model/eventData';

// hook
import Link from "@node_modules/next/link";
import Image from "@node_modules/next/image";


// lib to check  login and sign up after login
import { signOut, useSession } from '@node_modules/next-auth/react';
import Button from '@components/Button/Button';

const My_Booking = () => {

  // State to manage which section is currently displayed
  const [activeSection, setActiveSection] = useState('myBooking');

  // Function to handle "My Booking" button click
  const handleBooking = () => {
    setActiveSection('myBooking');
  };

  // Function to handle "My Event" button click
  const handleEvents = () => {
    setActiveSection('myEvents');
  };

  // reload

  const { data: session, status } = useSession();
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(true);

  // Ensure loading state persists for at least 3000ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Filter states
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGroupEvent, setSelectedGroupEvent] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  const handleCheckboxChange = (filterType, value) => {
    if (filterType === "date") {
      setSelectedDates(prev =>
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    } else if (filterType === "price") {
      setSelectedPrices(prev =>
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    } else if (filterType === "category") {
      setSelectedCategories(prev =>
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    } else if (filterType === "groupEvent") {
      setSelectedGroupEvent(prev =>
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    }
  };

  // Filter events based on selected filters
  const filteredEvents = events.filter(event => {
    const dateMatch = selectedDates.length === 0 || selectedDates.includes(event.date);
    const priceMatch = selectedPrices.length === 0 || selectedPrices.includes(event.ticketEvent);
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(event.typeEvent);
    const groupEventMatch = selectedGroupEvent.length === 0 || selectedGroupEvent.includes(event.category);

    return dateMatch && priceMatch && categoryMatch && groupEventMatch;
  });

  const handleSeeMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };

  if (showLoading && status === 'unauthenticated') {
    return <Loading />;
  }

  // If unauthenticated, avoid rendering until redirection
  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div>
      <Header />
      <div className='w-full h-full my-20 flex flex-col justify-center items-center'>
        <div className='w-9/12 h-auto flex flex-col '>

          <div className='flex justify-between border-t-2 border-dotted border-black border-b-2 p-2 mb-8'>
            <div className='w-1/2 flex justify-center items-center'>
              <RxAvatar
                size={150}
              />
            </div>

            <div className='w-1/2 flex justify-center items-center'>
              {session && session.user ? (
                <div className='flex flex-col gap-4'>
                  <p>Name : {session.user?.lastName}</p>
                  <p>Email : {session.user?.email}</p>
                  <p>Date of Birth : 11/18/2024</p>
                </div>
              ) : (
                <div>
                  <p>Name : Null</p>
                  <p>Email : null</p>
                </div>
              )}
            </div>

            <div className='w-1/2 flex justify-center items-center'>
              <button className='bg-customPurple-default hover:bg-customPurple-hover text-white transition-all w-fit h-fit p-3 rounded-lg'>Update</button>
            </div>
          </div>

          <div className='flex gap-12 mb-8'>
            {/* Button for "My Booking" */}
            <button
              id='myBooking'
              className={`font-bold text-black border-b-2 ${activeSection === 'myBooking' ? 'border-b-customPurple' : 'border-b-transparent'} hover:border-b-2 hover:border-b-customPurple-hover transition-all`}
              onClick={handleBooking}
            >
              My Booking
            </button>

            {/* Button for "My Event" */}
            <button
              id='myEvents'
              className={`font-bold text-black border-b-2 ${activeSection === 'myEvents' ? 'border-b-customPurple' : 'border-b-transparent'} hover:border-b-2 hover:border-b-customPurple-hover transition-all`}
              onClick={handleEvents}
            >
              My Event
            </button>
          </div>

          {/* Conditionally render content for my booking*/}
          <div className='w-full h-auto'>
            {activeSection === 'myBooking' && (
              <div className='w-full'>
                <div className="w-full h-auto flex justify-center ">
                  <div className="w-full flex ">
                    <div className=" w-full">
                      <div className='w-full lg:flex justify-center gap-16'>
                        {/* Filter Section */}
                        <div>
                          <div className="hidden lg:flex flex-col space-y-6">
                            <div className="flex justify-between items-center">
                              <h2 className="text-lg font-bold text-black">Filters</h2>
                              <button
                                onClick={() => {
                                  setSelectedDates([]);
                                  setSelectedPrices([]);
                                  setSelectedCategories([]);
                                  setSelectedGroupEvent([]);
                                }}
                                className="border-none text-blue-600 underline"
                              >
                                Reset
                              </button>
                            </div>

                            {/* Date Filter */}
                            <div>
                              <h3 className="text-lg font-semibold text-black">Date</h3>
                              <div className="space-y-2">
                                {Array.from(new Set(events.map(event => event.date))).map((date, index) => (
                                  <label key={index} className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      className="form-checkbox h-4 w-4 text-blue-600"
                                      checked={selectedDates.includes(date)}
                                      onChange={() => handleCheckboxChange("date", date)}
                                    />
                                    <span className="text-gray-700">{date}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            {/* Price Filter */}
                            <div>
                              <h3 className="text-lg font-semibold text-black">Ticket Status</h3>
                              <div className="space-y-2">
                                {Array.from(new Set(events.map(event => event.ticketEvent))).map((price, index) => (
                                  <label key={index} className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      className="form-checkbox h-4 w-4 text-blue-600"
                                      checked={selectedPrices.includes(price)}
                                      onChange={() => handleCheckboxChange("price", price)}
                                    />
                                    <span className="text-gray-700">{price}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            {/* Event Type Filter */}
                            <div>
                              <h3 className="text-lg font-semibold text-black">Event Type</h3>
                              <div className="space-y-2">
                                {Array.from(new Set(events.map(event => event.typeEvent))).map((type, index) => (
                                  <label key={index} className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      className="form-checkbox h-4 w-4 text-blue-600"
                                      checked={selectedCategories.includes(type)}
                                      onChange={() => handleCheckboxChange("category", type)}
                                    />
                                    <span className="text-gray-700">{type}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            {/* Category Filter */}
                            <div>
                              <h3 className="text-lg font-semibold text-black">Category</h3>
                              <div className="space-y-2">
                                {Array.from(new Set(events.map(event => event.category))).map((category, index) => (
                                  <label key={index} className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      className="form-checkbox h-4 w-4 text-blue-600"
                                      checked={selectedGroupEvent.includes(category)}
                                      onChange={() => handleCheckboxChange("groupEvent", category)}
                                    />
                                    <span className="text-gray-700">{category}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Event Display Section */}
                        <div className=' w-full'>
                          <div className="h-auto flex w-full lg:w-full justify-center">
                            <div className="grid grid-cols-1 gap-9">
                              {filteredEvents.slice(0, visibleCount).map(event => {
                                const { id, imageEvent, eventName, date, ticketEvent, location, creatorName, typeEvent, qr } = event;
                                return (
                                  <div key={id} className='w-full h-auto flex flex-wrap sm:flex-nowrap gap-8 lg:gap-16'>
                                    <div className='rounded-lg w-full  h-auto shadow-2xl bg-white flex justify-between gap-4 p-4 transition-transform transform hover:scale-105 '>
                                      <div className='overflow-hidden w-36 lg:w-96 h-auto relative rounded-lg'>
                                        <Image
                                          src={imageEvent}
                                          alt={eventName}
                                          layout='fill'
                                          objectFit='cover'
                                        />
                                      </div>

                                      <div className='w-64'>
                                        <div className='flex justify-between my-3 w-full'>
                                          <h2 className='text-black font-extrabold text-xl'>{eventName}</h2>
                                          <span className='text-black font-bold text-lg relative group cursor-pointer'>
                                            ...
                                            <div className='absolute hidden group-hover:block bg-white text-black border-gray-300 rounded-lg shadow-lg'>
                                              <div className='p-2 flex flex-col'>
                                                <Link href="">Delete</Link>
                                                <Link href="">Report</Link>
                                              </div>
                                            </div>
                                          </span>
                                        </div>

                                        <div className='mb-3 flex justify-between'>
                                          <h2 className='text-black font-semibold text-lg'>{date}</h2>
                                          <span className='text-black font-semibold text-lg'>{ticketEvent}</span>
                                        </div>

                                        <div className="mb-3">
                                          <h2 className='text-black font-semibold text-lg'>{location}</h2>
                                        </div>

                                        <div className='mb-3 flex justify-between'>
                                          <h2 className='text-black font-semibold text-lg'>{creatorName}</h2>
                                          <h2 className='text-black font-semibold text-lg'>{typeEvent}</h2>
                                        </div>

                                        <Link href={`/profile/${event.id}`}>
                                          <Button
                                            param="See Detail"
                                          />
                                        </Link>
                                      </div>
                                    </div>
                                    <div className='overflow-hidden w-7/12 h-auto relative rounded-lg p-4 shadow-2xl bg-white transition-transform transform hover:scale-105'>
                                      <Image
                                        src={qr}
                                        alt="QR"
                                        layout="responsive"
                                        width={500}  // Set base width
                                        height={500} // Set base height to maintain aspect ratio
                                        objectFit='cover'
                                        className='border-2 border-black'
                                      />
                                    </div>


                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* See More Button */}
                          <div className="w-3/12 lg:w-full flex items-center justify-center mt-12">
                            {visibleCount < filteredEvents.length && (
                              <Button
                                onClick={handleSeeMore}
                                param="See More"
                              />
                            )}
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* for my event sesstion */}
            {activeSection === 'myEvents' && (
              <div>
                <Events
                  noMap="no"
                  EventCreator="yes"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default My_Booking