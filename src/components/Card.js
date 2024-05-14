import React, { useState, useRef, useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'
import Modal from '../Modal';
import Cart from '../screens/Cart';
import FoodDetails from './FoodDetails';

export default function Card(props) {

    let dispatch = useDispatchCart();
    let data = useCart();

    const priceRef = useRef();

    const [openFoodDetailsModal, setOpenFoodDetailsModal] = useState(false)

    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")

    let options = props.options;
    let priceOptions = Object.keys(options)

    const handleAddToCArt = async () => {

        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;

                break;
            }
        }

        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return

            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
                return
                // console.log(data)
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })


    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div >
            <div style={{ "width": "18rem" }}>
                <div className="card mt-3" style={{ "width": "18rem;", "maxHeight": "360px" }}>
                    <img onClick={()=>setOpenFoodDetailsModal(true)} src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "130px", objectFit: "fill" }} />
                    

{openFoodDetailsModal ? <Modal onClose={()=> setOpenFoodDetailsModal(false)}> <FoodDetails/>  </Modal> : null}
                    <div className="card-body" style={{"backgroundColor":"#f74836"}}>
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <div className='container w-100'>
                            <select  className='m-2 h-100  ' style={{"backgroundColor":"#aa8b88"}}  onChange={(e) => setQty(e.target.value)} >
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}> {i + 1}  </option>
                                    )
                                })}
                            </select>

                            <select className='m-2 h-100 ' style={{"backgroundColor":"#aa8b88"}}  ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data}> {data} </option>

                                })}
                            </select>

                            <div className='d-inline h-100 fs-5'>
                                ₹{finalPrice}/-
                            </div>

                        </div>

                        <hr></hr>

                        <button className={'btn btn-success justify-center ms-2'} style={{"backgroundColor":"#aa8b88"}}  onClick={handleAddToCArt}> Add to Cart </button>
                    </div>
                </div>
            </div>



        </div>
    )
}
