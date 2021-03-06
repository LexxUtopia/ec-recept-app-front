import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SearchList } from './SearchList';
import React from 'react';

export const SideBar = ({ loggedIn, recipes }) => {
    const [searchShow, setSearchShow] = useState(false);
    const [searchField, setSearchField] = useState('');
    const [filtered, setFiltered] = useState([]);

    const handleChange = (e) => {
        setSearchField(e.target.value);
        const filtrec = recipes.filter((item) => {
            return item.title.toLowerCase().includes(searchField.toLowerCase());
        });

        if (e.target.value === '') {
            setSearchShow(false);
        } else {
            setSearchShow(true);
            setFiltered(filtrec);
        }
    };

    return (
        <div className="col-lg-2 bg-dark ">
            <div className="d-flex justify-content-around flex-column p-3 text-white sticky-top">
                <Link to="/" className="my-3 text-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <img src="logo.png" className="text-center w-100" alt="" />
                </Link>

                <div className="my-5">
                    <input className="search-input" type="text" placeholder="search" onChange={handleChange} />
                    {searchShow
                        ? filtered?.map((item) => {
                              return (
                                  <SearchList
                                      filteredItems={item.title}
                                      id={item.id}
                                  />
                              );
                          })
                        : null}
                </div>
                <ul className="nav nav-pills flex-column mb-auto text-uppercase">
                    <li>
                        <Link to="/" className="link-light active">
                            <h5>Home</h5>
                        </Link>
                    </li>
                    <li>
                        <Link to="/allrecipes" className="link-light">
                            <h5>Recept</h5>
                        </Link>
                        
                    </li>
                </ul>
                
                <div className="text-center">
                    <hr className="mt-5"/>
                        {loggedIn ? (
                            <Link to="/profile">
                                <h5 className="text-wrap link-light">
                                    <FontAwesomeIcon
                                        icon={faUserCircle}
                                        className="userIcon"
                                        size="lg"
                                    />
                                </h5>
                            </Link>
                        ) : (
                            <Link to="/login" className="link-light">
                                <h5 className="text-wrap">
                                    <FontAwesomeIcon  icon={faUserCircle} className="userIcon" size="lg" />
                                    Login/Register
                                </h5>
                            </Link>
                        )}
                    <p className="copyright">
                        <FontAwesomeIcon icon={faCopyright} /> Powered by Group 2
                    </p>
                </div>
            </div>
        </div>
    );
};
