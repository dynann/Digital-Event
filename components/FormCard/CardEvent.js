"use client"

import Image from 'next/image';
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useState } from 'react';
import style from "@styles/cardevent.module.css"
import React, { useRef } from 'react';
import { useRouter } from '@node_modules/next/navigation';
import Button from '@components/Button/Button';
const CardEvent = ({ id, imageEvent, eventName, date, creatorName, ticketEvent, typeEvent, location, page }) => {

    const router = useRouter()

    const [isFavorite, setIsFavorite] = useState(false);

    const handleToggle = () => {
        setIsFavorite(!isFavorite);
    }

    // hover around with 3d ani
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const { current } = cardRef;
        if (!current) return;

        const { left, top, width, height } = current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const deltaX = (e.clientX - centerX) / width;
        const deltaY = (e.clientY - centerY) / height;

        const rotationX = deltaY * 15; // Adjust 15 to your desired rotation degree
        const rotationY = deltaX * 15; // Adjust 15 to your desired rotation degree

        current.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
        const { current } = cardRef;
        if (current) {
            current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
    };

    const handleRouter = (e) => {
        e.preventDefault();
        router.push(`/find_event/${id}`);
    }

    // three dot 
    const threeDot = () => {
        if (page !== "homePage") {
            return (
                <span className='text-black font-bold text-lg relative group cursor-pointer'>
                    ...
                    <div className='absolute hidden group-hover:block bg-white text-black border-gray-300 rounded-lg shadow-lg'>
                        <div className='p-2 flex flex-col'>
                            <ul>
                                <li>Report</li>
                            </ul>
                        </div>
                    </div>
                </span>
            )
        }
    }

    return (
        <div
            className={`${style.CardEvent} p-3 w-72 shadow-2xl bg-white rounded-lg`}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div>
                <div className='overflow-hidden w-full  h-48 relative rounded-lg'>
                    <Image
                        src={imageEvent}
                        alt={eventName}
                        layout='fill'
                        objectFit='cover'
                    />
                    <div className='absolute top-2 right-2 z-20 flex'>
                        {!isFavorite ? (
                            // Clickable when clicked on it
                            <MdFavoriteBorder
                                size={24}
                                onClick={handleToggle}
                            />
                        ) : (
                            // Then display this
                            <MdFavorite
                                size={24}
                                onClick={handleToggle}
                                color='red'
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className='flex justify-between my-3 '>
                <h2 className='text-black font-extrabold text-xl'>{eventName}</h2>
                {threeDot()}
            </div>

            <div className='mb-3 flex justify-between'>
                <h2 className='text-black font-semibold text-lg'>{date}</h2>
                <span className='text-black font-semibold text-lg'>{ticketEvent}</span>
            </div>

            <dir className="mb-3">
                <h2 className='text-black font-semibold text-lg'>{location}</h2>
            </dir>

            <div className='mb-3 flex justify-between'>
                <h2 className='text-black font-semibold text-lg'>{creatorName}</h2>
                <h2 className='text-black font-semibold text-lg'>{typeEvent}</h2>
            </div>
            <Button
                param="Book Now"
                onClick={handleRouter}
            />
        </div>
    )
}

export default CardEvent;