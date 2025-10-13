import React from "react";
import {
    QueryClient,
    QueryClientProvider,
    QueryCache,
    MutationCache,
} from "@tanstack/react-query";

type Props = {
    children: React.ReactNode;
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 10,
        },
    },
    queryCache: new QueryCache({
        onError: (error) => {
            console.error("Query Error:", error);
        },
    }),
    mutationCache: new MutationCache({
        onError: (error) => {
            console.error("Mutation Error:", error);
        },
    }),
});

export const TanstackProvider: React.FC<Props> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />} */}
        </QueryClientProvider>
    );
};

