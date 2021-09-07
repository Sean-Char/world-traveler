import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map.jsx';


const App = () => {
    const [places, setPlaces] = useState([]);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});

    // get current location 
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        });
    }, []);

    // get places from 
    useEffect(() => {
        //console.log(coordinates, bounds);
        getPlacesData(bounds.sw, bounds.ne)
            .then((data) => {
                //console.log(data)
                setPlaces(data);
            })
    }, [coordinates, bounds]);
    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ width: '100' }}>
                <Grid xs={12} md={4}>
                    <List places={places} />
                </Grid>
                <Grid xs={12} md={8}>
                    <Map 
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={places}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;