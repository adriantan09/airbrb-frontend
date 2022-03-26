import { React, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CreateListing from './pages/createListing/CreateListing';
import HostedListings from './pages/hostedListings/HostedListings';
import EditListing from './pages/editListing/EditListing';
import PublishListing from './pages/publishListing/PublishListing';
import NotFound from './pages/NotFound';
import Listing from './pages/viewListing/Listing';
import Prompt from './components/Prompt';
import { handleToken } from './handleToken';
import ListingBookings from './pages/manageListing/ListingBookings';

const App = () => {
  const { setToken, authenticated } = handleToken();

  const [prompt, setPrompt] = useState(false);

  return (
    <BrowserRouter>
      {prompt && (
        <Prompt
          prompt={prompt}
          setPrompt={setPrompt}
          message={'Authentication Required'}
          severity={'error'}
        />
      )}

      <NavBar auth={authenticated} setToken={setToken} />

      <Switch>
        <Route exact path='/' render={() => <Home auth={authenticated} />} />
        <Route exact path='/signin' render={() => <SignIn setToken={setToken} />} />
        <Route exact path='/signup' render={() => <SignUp setToken={setToken} />} />
        <Route
          exact
          path='/listing/:id'
          render={() => <Listing auth={authenticated} setPrompt={setPrompt} />}
        />
        <PrivateRoute
          exact
          path='/create-listing'
          auth={authenticated}
          component={CreateListing}
          setPrompt={setPrompt}
        />
        <PrivateRoute
          exact
          path='/hosted-listings'
          auth={authenticated}
          component={HostedListings}
          setPrompt={setPrompt}
        />
        <PrivateRoute
          exact
          path='/listing/edit/:id'
          auth={authenticated}
          component={EditListing}
          setPrompt={setPrompt}
        />
        <PrivateRoute
          exact
          path='/listing/publish/:id'
          auth={authenticated}
          component={PublishListing}
          setPrompt={setPrompt}
        />
        <PrivateRoute
          exact
          path='/listing/bookings/:id'
          auth={authenticated}
          component={ListingBookings}
          setPrompt={setPrompt}
        />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;

const PrivateRoute = ({ component: Component, auth, setPrompt, ...rest }) => {
  if (!auth) {
    setPrompt(true);
  }
  return (
    <Route
      {...rest}
      render={({ props }) =>
        auth === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/signin' }} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
  auth: PropTypes.bool,
  rest: PropTypes.any,
  setPrompt: PropTypes.func,
};
