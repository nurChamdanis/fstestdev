import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "../store/store"; 

const MyApp = ({ Component, pageProps }: AppProps) => {
    const { store } = wrapper.useWrappedStore(pageProps);

    return (
        <Provider store={store}>
            <Component {...pageProps} />  
        </Provider>
    );
};

export default wrapper.withRedux(MyApp);
