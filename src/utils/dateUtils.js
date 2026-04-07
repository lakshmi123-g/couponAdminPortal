// Expiry handling utility function

export const isExpired=(expiryDate)=>{

    if(!expiryDate) return false;

    const today=new Date();
    const expiry=new Date(expiryDate);

    today.setHours(0,0,0,0);
    expiry.setHours(0,0,0,0);
    return expiry<today




}