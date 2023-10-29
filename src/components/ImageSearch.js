/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
// import { IntersectionObserver } from "intersection-observer";
import axios from "axios";
import './style.css';
import loadingGif from "./gif2.gif";

const ImageSearch = () => {
    const [query, setQuery] = useState("");
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const apiKey = "U2tKxvkIHwX2ADEqvM0d2l80ADbKfxmcZEoM4LMK2my3K5zxFc7YDMKi";
    const perPage = 18;

    const fetchPhotos = async () => {
        setLoading(true);
        try {
            console.log("page ", page)
            const response = await axios.get(
                `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${page}`,
                {
                    headers: {
                        Authorization: apiKey,
                    },
                }
            );
            setPhotos([...photos, ...response.data.photos]);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        setPhotos([]); // Clear existing photos
        setPage(1); // Reset the page to 1
        fetchPhotos(); // Call the API
    };

    const handleScrollEnd = () => {
        if (1) {
            console.log("hello");
            setPage(page + 1);
            fetchPhotos(); // Fetch more photos as the user scrolls to the end of the page
        }
    };

    useEffect(() => {
        window.addEventListener("scrollend", handleScrollEnd);
        return () => {
            window.removeEventListener("scrollend", handleScrollEnd);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, page]);


    // Reset photos and page when query changes
    useEffect(() => {
        setPhotos([]);
        setPage(1);
    }, [query]);


    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search for photos"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="photo-grid">
                {photos.map((photo) => (
                    <img key={photo.id} src={photo.src.medium} />
                ))}
            </div>
            {loading && (
                <div className="loading-indicator">
                    <img src={loadingGif} alt="Loading..." width="200" height="200" />
                </div>
            )}
        </div>
    );
};

export default ImageSearch;
