import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

const Root = ({ children }: PropsWithChildren) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                <link rel="manifest" href="/manifest.json" />

                <meta name="theme-color" content="#208AEF" />

                <ScrollViewStyleReset />
            </head>

            <body>{children}</body>
        </html>
    );
};

export default Root;
