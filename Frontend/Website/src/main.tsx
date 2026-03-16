// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import axios from "axios";
import "leaflet/dist/leaflet.css";

import './index.css'
import { Layout } from './Components/LayoutArea/Layout/Layout.js'
import { interceptor } from './Utils/Interceptor'
import { Provider } from 'react-redux';
import { store } from './Redux/Store.js';


// axios.defaults.baseURL = "http://35.178.212.214:4003";
axios.defaults.baseURL = "/api";
interceptor.create();

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </Provider>

)
