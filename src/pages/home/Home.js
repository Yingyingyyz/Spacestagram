import React, { useEffect, useState } from 'react';
import { Container, Grid, useScrollTrigger, Slide, AppBar, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import CardItem from '../../components/cardItem/Index';
import { getDataAction } from '../../api';
import DatePickers from '../../components/datePicker/Index'
import { monthTimestamp } from '../../utlis';
import './Index.scss'

function Home(props) {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(new Date(new Date().valueOf() - monthTimestamp));
    const [endDate, setEndDate] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [displayMsg, setDisplayMsg] = useState(false);

    const getData = async (startDate, endDate) => {
        setLoading(true);
        const res = await getDataAction(startDate, endDate);
        setData([...res]);
        setLoading(false);
    }
    const handleSetStartDate = (date) => {
        setStartDate(date)
    }
    const handleSetEndDate = (date) => {
        setEndDate(date)

    }
    //1.Get a list of image detail resources
    //2.Only triggered when the start and end dates are changed or when you first enter the page.
    useEffect(() => {
        getData(startDate, endDate);
    }, [startDate, endDate]);

    //Add a listener event to listen to the custom share image link event
    useEffect(() => {
        const callback = function () {
            setDisplayMsg(true);
            setTimeout(() => setDisplayMsg(false), 3000)
        }
        document.addEventListener('successCopy', callback);
        return () => {
            document.removeEventListener('successCopy', callback)
        }
    }, [])

    //A pop-up prompt with a successful image sharing link
    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    //Hide or show the appbar when the scrollbar is scrolling
    const HideOnScroll = (props) => {
        const { children, window } = props;
        const trigger = useScrollTrigger({ target: window ? window() : undefined });
        return (
            <Slide appear={false} direction="down" in={!trigger}>
                {children}
            </Slide>
        );
    }
    return (
        <div className="home">
            <HideOnScroll {...props}>
                <AppBar className="appBar" >
                    <div >
                        <h2>Spacestagram</h2>
                        <span >
                        Brought to you by NASA's Astronomy Photo of the Day (APOD) API
                        </span>
                    </div>
                    <DatePickers
                        startDate={startDate}
                        endDate={endDate}
                        onEndDateChange={handleSetEndDate}
                        onStartDateChange={handleSetStartDate}
                    />
                </AppBar>
            </HideOnScroll>
            <Container className="container">

                <Snackbar open={displayMsg}>
                    <Alert severity="success">
                        Image URL successfully copied to clipboard!
                    </Alert>
                </Snackbar>
                <Grid
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                    container
                >
                    {
                        data.map((imageContent, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Grid item>
                                        <CardItem {...imageContent} />
                                    </Grid>
                                </React.Fragment>
                            )
                        })
                    }
                </Grid>
                <div className="loading">
                    {
                        loading && (
                            <h1  >Loading...</h1>
                        )
                    }
                </div>

            </Container>
        </div>
    );
}

export default Home;
