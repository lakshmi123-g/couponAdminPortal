import React ,{useState,useEffect}from "react"
import * as services from "../services/couponService"
import { isExpired } from "../utils/dateUtils"


 export const useCoupons=()=>{

    const[coupons,setCoupons]=useState([])

    useEffect(()=>{
        console.log("renderinggg");
        
        loadCoupons()

    },[])

    const loadCoupons=()=>{
        const data=services.getCoupons().map(c=>
        ({...c,expired:isExpired(c.expiryDate)}
        ))
        setCoupons(data);
    }
   const createCoupon=(coupon)=>{
    services.addCoupon(coupon);
    loadCoupons();
   }

   const removeCoupon=(id)=>{
    services.deleteCoupon(id);
    loadCoupons();
   }
   const editCoupon=(id,updatedCoupon)=>{
    services.updateCoupon(id,updatedCoupon);
    loadCoupons();
   }
   const toggleStatus=(id)=>{
    const updated=coupons.map(c=>c.id===id?{...c,active:!c.active}:c);
    setCoupons(updated);

   }
   return{
    coupons,
    createCoupon,
    removeCoupon,
    editCoupon,
    toggleStatus
   }

}


