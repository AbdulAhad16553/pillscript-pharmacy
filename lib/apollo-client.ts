import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { nhost } from "./nhost"

const httpLink = createHttpLink({
  uri: nhost.graphql.getUrl(),
})

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from Nhost
  const token = nhost.auth.getAccessToken();

  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: {
            merge(existing = [], incoming) {
              void existing;
              return incoming;
            },
          },
          pharmacy_users: {
            merge(existing = [], incoming) {
              void existing;
              return incoming;
            },
          },
          company: {
            merge(existing = [], incoming) {
              void existing;
              return incoming;
            },
          },
        },
      },
    },
  }),
});


