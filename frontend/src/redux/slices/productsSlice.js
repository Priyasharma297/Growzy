import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async ({
    category,
    type,
    minPrice,
    maxPrice,
    sortBy,
    search,
    sunlight,
    watering,
    difficulty,
    tags,
    limit,
  }) => {
    const query = new URLSearchParams();
    if (category) query.append("category", category);
    if (type) query.append("type", type);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (sunlight) query.append("sunlight", sunlight);
    if (watering) query.append("watering", watering);
    if (difficulty) query.append("difficulty", difficulty);
    if (tags) query.append("tags", tags.join(","));
    if (limit) query.append("limit", limit);

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
    );
    return response.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
    );
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  }
);

export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
    );
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    similarProducts: [],
    loadingProducts: false,
    errorProducts: null,
    loadingDetails: false,
    errorDetails: null,
    loadingUpdate: false,
    errorUpdate: null,
    loadingSimilar: false,
    errorSimilar: null,
    filters: {
      category: "",
      type:"",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      search: "",
      sunlight: "",
      watering: "",
      difficulty: "",
      tags: [],
      limit: 0,
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        type:"",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        sunlight: "",
        watering: "",
        difficulty: "",
        tags: [],
        limit: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products by Filters
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loadingProducts = true;
        state.errorProducts = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loadingProducts = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loadingProducts = false;
        state.errorProducts = action.error?.message || "Failed to fetch products";
      })

      // Fetch Product Details
      .addCase(fetchProductDetails.pending, (state) => {
        state.loadingDetails = true;
        state.errorDetails = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loadingDetails = false;
        state.errorDetails = action.error?.message || "Failed to fetch product details";
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loadingUpdate = true;
        state.errorUpdate = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loadingUpdate = false;
        const updated = action.payload;
        const index = state.products.findIndex((p) => p._id === updated._id);
        if (index !== -1) {
          state.products[index] = updated;
        }
        if (state.selectedProduct?._id === updated._id) {
          state.selectedProduct = updated;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loadingUpdate = false;
        state.errorUpdate = action.error?.message || "Failed to update product";
      })

      // Fetch Similar Products
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loadingSimilar = true;
        state.errorSimilar = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loadingSimilar = false;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loadingSimilar = false;
        state.errorSimilar = action.error?.message || "Failed to fetch similar products";
      });
  },
});

export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
