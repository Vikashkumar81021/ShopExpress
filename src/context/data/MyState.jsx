import React, { useEffect, useState } from "react";
import myContext from "./myContext";
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../Fiberbase/FirebaseConfig";
function MyState(props) {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [Loading, setloading] = useState(false);
  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const addProduct = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageUrl == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("all fields are required");
    }

    // setLoading(true)

    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, products);
      toast.success("Add product successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      getProductData();
      // setLoading(false)
    } catch (error) {
      console.log(error);
      // setLoading(false)
    }
    // setProducts("")
  };

  const [product, setProduct] = useState([]);

  const getProductData = async () => {
    // setLoading(true)

    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productArray);
        // setLoading(false)
      });

      return () => data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductData();
  }, []);

  //UPDATE PRODUCT
  const edithandle = (item) => {
    setProduct(item);
  };
  const updateproduct = async () => {
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("product update successfully");
      getProductData();
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 8000);
    } catch (error) {
      console.log(error);
    }
    setProduct("");
  };

  const deleteproduct = async (item) => {
    try {
      await deleteDoc(doc(fireDB, "products", item.id)); // Fix the typo here
      toast.success("product deleted successfully");
      getProductData();
    } catch (error) {
      console.log(error);
    }
  };
  const [order, setorder] = useState("");
  const getOrderData = async () => {
    try {
      const result = await getDoc(collection(fireDB, "order"));
      const orderarray = [];
      result.forEach((doc) => {
        orderarray.push(doc.data());
      });
      setorder(orderarray);
    } catch (error) {
      console.log(error);
    }
  };

  const [user,setuser]=useState([]);
  const getuserData=async()=>{
    try {
      const result=await getDocs(collection(fireDB,"users"))
      const usersarray=[];
      result.forEach((doc)=>{
        userarray.push(doc.data())
      });
      setuser(usersarray)
    } catch (error) {
      
    }
  }
  useEffect(() => {
    getOrderData();
    getuserData()
  }, []);

  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')

  return (
    <myContext.Provider
      value={{
        mode,
        toggleMode,
        Loading,
        setloading,
        products,
        setProducts,
        addProduct,
        product,
        edithandle,
        updateproduct,
        deleteproduct,
        order,
        user,
        searchkey, setSearchkey,filterType, setFilterType,
      filterPrice, setFilterPrice
      }}
    >
      {props.children}
    </myContext.Provider>
  );
}

export default MyState;
