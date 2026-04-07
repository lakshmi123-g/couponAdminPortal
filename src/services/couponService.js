let coupons=[];

export const getCoupons=()=>{
    return coupons;
}

export const addCoupon=(coupon)=>{
    coupons.push({...coupon,id:Date.now()});

}

export const deleteCoupon=(id)=>{
    coupons=coupons.filter(coupon=>coupon.id!==id);
}

export const updateCoupon=(id,updatedCoupon)=>{
    coupons=coupons.map(coupon=>coupon.id===id ? {...coupon,...updatedCoupon} : coupon);
}