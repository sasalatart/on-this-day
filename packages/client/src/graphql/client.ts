import ApolloClient, { InMemoryCache } from 'apollo-boost';
import swal from 'sweetalert2';
import { SERVER_URL } from '../config';
import i18n from '../i18n';

const cache = new InMemoryCache();

interface GraphQLError {
  message: string;
  extensions?: { code?: string };
}

function displayError(message: string): void {
  swal.fire({ title: i18n.t('error'), text: message, icon: 'error' });
}

function handleGraphQLError({ message, extensions }: GraphQLError): void {
  if (extensions?.code === 'BAD_USER_INPUT' && message) {
    return displayError(message);
  }

  displayError(i18n.t('errors.somethingWentWrong'));
}

function handleNetworkError({ message }: { message: string }): void {
  const displayMessage = i18n.t(
    `errors.${
      message === 'Failed to fetch' ? 'failedToFetch' : 'somethingWentWrong'
    }`,
  );

  displayError(displayMessage);
}

export const apolloClient = new ApolloClient({
  uri: SERVER_URL + '/graphql',
  onError({ graphQLErrors, networkError }): void {
    if (graphQLErrors) {
      console.error('graphQLErrors: ', graphQLErrors);
      graphQLErrors.forEach(handleGraphQLError);
    }

    if (networkError) {
      console.error('networkError:', networkError);
      handleNetworkError(networkError);
    }
  },
  cache,
});
