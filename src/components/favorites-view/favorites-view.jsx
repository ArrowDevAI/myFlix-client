import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Nav, Col, Button } from 'react-bootstrap';

const FavoriteView = ({ movies, token, user, onUpdateUser }) => {
    const [userFavorites, setUserFavorites] = useState([]);

    useEffect(() => {
        if (!user.FavoriteMovies.length) {
            setUserFavorites([]);
            return;
        }

        // Filter movies to get only favorites
        const filteredFavorites = movies.filter(movie => 
            user.FavoriteMovies.includes(movie.id) // Compare with movie.id
        );

        setUserFavorites(filteredFavorites);
    }, [movies, user.FavoriteMovies]);

    const handleRemoveFavorite = async (movieId) => {
        try {
            // Remove the movie from favorites via API
            await axios.delete(`https://movieurl-6be02303c42f.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Remove the movie from the local state
            const updatedFavorites = userFavorites.filter(movie => movie.id !== movieId);
            setUserFavorites(updatedFavorites);
            // Update user data in the parent component
            onUpdateUser({
                ...user,
                FavoriteMovies: user.FavoriteMovies.filter(id => id !== movieId)
            });
        } catch (error) {
            console.error("Error removing favorite movie:", error);
        }
    };
    return (
        <>
            <Nav fill variant="tabs" defaultActiveKey="/">
                <Nav.Item>
                    <Nav.Link href="/profile">Edit Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/favorites">Favorite Movies</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/update-password">Update Password</Nav.Link>
                </Nav.Item>
            </Nav>

            <Col md={12} style={{ marginTop: '50px' }}>
                <div>
                    {userFavorites.length > 0 ? (
                        <div>
                            <h2>Favorite Movies</h2>
                            {userFavorites.map((movie) => (
                                <div key={movie.id} style={{ marginBottom: '10px' }}>
                                    <img style={{ width: '50%' }} alt={movie.title} src={movie.image} />
                                    <div>
                                        <span>Title: </span>
                                        <span>{movie.title}</span>
                                    </div>
                                    <div>
                                        <span>Director: </span>
                                        <span>{movie.director}</span>
                                    </div>
                                    <Button 
                                        variant="danger" 
                                        onClick={() => handleRemoveFavorite(movie.id)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No favorite movies found.</p>
                    )}
                    <Link to="/">
                        <button className="button">Back</button>
                    </Link>
                </div>
            </Col>
        </>
    );
};

export { FavoriteView };
