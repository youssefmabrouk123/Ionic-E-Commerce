import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { setupIonicReact } from '@ionic/react';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useEffect } from 'react';
import { fetchData } from './data/fetcher';
import CategoryProducts from './pages/CategoryProducts';
import Product from './pages/Product';
import FavouriteProducts from './pages/FavouriteProducts';
import CartProducts from './pages/CartProducts';
import SignIn from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import Profile from './pages/Profile';
import SignInAdmin from './pages/SignInAdmin';
import DashboardAdmin from './pages/DashboardAdmin';
import ProfilAdmin from './pages/ProfilAdmin';
import Seller from './pages/Seller';
import AddSeller from './pages/AddSeller';
import SignInSeller from './pages/seller/SignInSeller';
import SignUpSeller from './pages/seller/SignUpSeller';
import StoreSeller from './pages/seller/StoreSeller';
import AddProduct from './pages/seller/AddProduct';
import ProductDetail from './pages/seller/ProductDetail';
import SellerProfile from './pages/seller/SellerProfile';
import UpdatePhoto from './pages/updatephoto';
import UpdateProduct from './pages/seller/UpdateProduct';
import Camera from './pages/Camera';
import Demands from './pages/admin/Demands';
import UpdateSeller from './pages/admin/UpdateSeller';


setupIonicReact({});

const App = () => {

	useEffect(() => {

		fetchData();
	}, []);

	return (
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet>
					<Switch>
						<Route path="/" exact={true}>
							<Redirect to="/home" />
						</Route>
						<Route path="/home" exact={true}>
							<Home />
						</Route>

						<Route path="/favourites" exact>
							<FavouriteProducts />
						</Route>

						<Route path="/cart" exact>
							<CartProducts />
						</Route>

						<Route path="/updatephoto/:id" exact component={UpdatePhoto} />


						<Route path="/category/:slug" exact>
							<CategoryProducts />
						</Route>

						<Route path="/category/:slug/:id" exact>
							<Product />
						</Route>


						{/* Admin Routage */}
						<Route path="/signinasadmin" exact>
							<SignInAdmin />
						</Route>
						<Route path="/dashboard" exact>
							<DashboardAdmin />
						</Route>
						<Route path="/adminprofil" exact>
							<ProfilAdmin />
						</Route>
						<Route path="/seller/:id" exact>
							<Seller />
						</Route>
						<Route path="/addseller" exact>
							<AddSeller />
						</Route>
						<Route path="/sellersdemands" exact>
							<Demands />
						</Route>
						<Route path="/updateseller/:id" exact >
							<UpdateSeller />
						</Route>



						{/* Seller Routage */}
						<Route path="/signupasseller" exact>
							<SignUpSeller />
						</Route>
						<Route path="/signinasseller" exact>
							<SignInSeller />
						</Route>
						<Route path="/sellerprofile" exact>
							<SellerProfile />
						</Route>
						<Route path="/store" exact>
							<StoreSeller/>
						</Route>
						<Route path='/addproduct' exact>
							<AddProduct/>
						</Route>
						<Route path='/product/:id' exact>
							<ProductDetail/>
						</Route>
						<Route path='/updateproduct/:id' exact>
							<UpdateProduct/>
						</Route>

						<Route path='/camera' exact>
							<Camera/>
						</Route>

						{/* ///// */}
						<Route path="/signin" exact>
							<SignIn />
						</Route>
						<Route path="/signup" exact>
							<SignUpPage />
						</Route>
						<Route path="/profile" exact>
							<Profile />
						</Route>
					</Switch>
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	);
}

export default App;