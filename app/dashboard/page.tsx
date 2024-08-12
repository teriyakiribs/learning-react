import React from 'react';
import Counter from '../components/Counter/Counter';
import TemperatureConverter from '../components/TemperatureConverter/TemperatureConverter';
import Timer from "../components/Timer/Timer";
import FlightBooker from "../components/FlightBooker/FlightBooker";
import Crud from "@/app/components/CRUD/Crud";

const Page: React.FC = () => {
    return (

        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <h1>Dashboard Page</h1>
            <hr/>
            <Counter/>
            <hr/>
            <TemperatureConverter/>
            <hr/>
            <Timer/>
            <hr/>
            <FlightBooker/>
            <hr/>
            <br/>
            <Crud/>
            <hr/>
            <br/>


        </div>
    );
};

export default Page;