import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PrimaryLayout from "./layout/PrimaryLayout";
import useFetchUser from "./global/useFetchUser";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./features/productsSlice";
import { fetchCategories } from "./features/categorySlice";
import CategoryPage from "./pages/productRelated/CategoryPage";
import SearchPage from "./pages/productRelated/SearchPage";
import CartPage from "./pages/CartPage";
import ViewProduct from "./pages/productRelated/ViewProduct";
import AccountPage from "./pages/accountRelated/AccountPage";
import UpdateAccount from "./pages/accountRelated/UpdateAccount";
import UpdateContact from "./pages/accountRelated/UpdateContact";
import UpdatePassword from "./pages/accountRelated/UpdatePassword";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ManageProduct from "./pages/admin/ManageProduct";
import NewProduct from "./pages/admin/NewProduct";
import EditProduct from "./pages/admin/EditProduct";
import ManageCategory from "./pages/admin/ManageCategory";
import NewCategory from "./pages/admin/NewCategory";
import EditCategory from "./pages/admin/EditCategory";
import Checkout from "./pages/paymentRelated/Checkout";
import ManageRegion from "./pages/admin/ManageRegion";
import NewRegion from "./pages/admin/NewRegion";
import EditRegion from "./pages/admin/EditRegion";
import { fetchRegions } from "./features/regionSlice";
import Login2 from "./pages/Login2";
import ManageOrder from "./pages/admin/ManageOrder";
import ViewOrder from "./pages/admin/ViewOrder";
import OrderPage from "./pages/accountRelated/OrderPage";
import ViewUserOrder from "./pages/accountRelated/ViewUserOrder";
import ManageUser from "./pages/admin/ManageUser";
import ViewUser from "./pages/admin/ViewUser";
import WishlistPage from "./pages/accountRelated/WishlistPage";

const App = () => {
  useFetchUser();
  const dispatch = useDispatch();
  const productStatus = useSelector((state) => state.products.status);
  const categoryStatus = useSelector((state) => state.category.status);
  const regionStatus = useSelector((state) => state.region.status);
  const auth = useSelector((state) => state.user.auth);
  const user = useSelector((state) => state.user.profile);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (auth && user) {
      // Ensure we have authentication and user info
      const isAdminRoute = location.pathname.includes("/admin");
      const isAdmin = user.role === "admin";
      if (isAdminRoute && !isAdmin) {
        navigate("/"); // Redirect non-admin to home
      }
    }
  }, [auth, user, location.pathname, navigate]);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [categoryStatus, dispatch]);

  useEffect(() => {
    if (regionStatus === "idle") {
      dispatch(fetchRegions());
    }
  }, [regionStatus, dispatch]);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    // eslint-disable-next-line
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrimaryLayout>
            <Home />
          </PrimaryLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <PrimaryLayout>
            <Signup />
          </PrimaryLayout>
        }
      />
      <Route
        path="/login"
        element={
          <PrimaryLayout>
            <Login />
          </PrimaryLayout>
        }
      />
      <Route
        path="/login-user"
        element={
          <PrimaryLayout>
            <Login2 />
          </PrimaryLayout>
        }
      />
      <Route
        path="/categories/:name"
        element={
          <PrimaryLayout>
            <CategoryPage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/search"
        element={
          <PrimaryLayout>
            <SearchPage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <PrimaryLayout>
            <CartPage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/checkout"
        element={
          <PrimaryLayout>
            <Checkout />
          </PrimaryLayout>
        }
      />
      <Route
        path="/products/:slug"
        element={
          <PrimaryLayout>
            <ViewProduct />
          </PrimaryLayout>
        }
      />
      <Route
        path="/user"
        element={
          <PrimaryLayout>
            <AccountPage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/user/order"
        element={
          <PrimaryLayout>
            <OrderPage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/user/wishlist"
        element={
          <PrimaryLayout>
            <WishlistPage />
          </PrimaryLayout>
        }
      />
      <Route
        path="/user/order/:order_number"
        element={
          <PrimaryLayout>
            <ViewUserOrder />
          </PrimaryLayout>
        }
      />
      <Route
        path="/user/update-account-details"
        element={
          <PrimaryLayout>
            <UpdateAccount />
          </PrimaryLayout>
        }
      />
      <Route
        path="/user/update-contact-details"
        element={
          <PrimaryLayout>
            <UpdateContact />
          </PrimaryLayout>
        }
      />
      <Route
        path="/user/update-password"
        element={
          <PrimaryLayout>
            <UpdatePassword />
          </PrimaryLayout>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/manage-product"
        element={
          <AdminLayout>
            <ManageProduct />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/add-product"
        element={
          <AdminLayout>
            <NewProduct />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/edit-product/:slug"
        element={
          <AdminLayout>
            <EditProduct />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/manage-category"
        element={
          <AdminLayout>
            <ManageCategory />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/add-category"
        element={
          <AdminLayout>
            <NewCategory />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/edit-category/:id"
        element={
          <AdminLayout>
            <EditCategory />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/manage-region"
        element={
          <AdminLayout>
            <ManageRegion />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/add-region"
        element={
          <AdminLayout>
            <NewRegion />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/edit-region/:id"
        element={
          <AdminLayout>
            <EditRegion />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/manage-order"
        element={
          <AdminLayout>
            <ManageOrder />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/view-order/:order_number"
        element={
          <AdminLayout>
            <ViewOrder />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/manage-users"
        element={
          <AdminLayout>
            <ManageUser />
          </AdminLayout>
        }
      />
      <Route
        path="/admin/manage-users/:id"
        element={
          <AdminLayout>
            <ViewUser />
          </AdminLayout>
        }
      />
    </Routes>
  );
};

export default App;
