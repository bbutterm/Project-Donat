import React from "react";
import { useState,useEffect } from "react";
import Modal from "./Modal"
import list from "../data/list"
import list2 from "../data/list2"
import { compony } from "../data/ArrayCompony";
import { ethers,Contract,parseEther,formatEther } from "ethers";
import abi from "../abi.json"
import campaingFactory from "../data/campaingFactory";
import filterName from "./serachFunc";


export default function Search(){
    const [findName, setFind] = useState("");
    const [fin, setFin] = useState(false);
    const [findCategory, setCategory] = useState("All");
    const [findCountry, setCountry] = useState("All");
    const [items, setItems] = useState(compony);
    const [modalActive, setModalActive] = useState(false)
    const [forModal ,setForModal]=useState(items[0])
    const [name,setName] = useState()
    const [signer ,setSigner] = useState()
    // const [address ,setAddress]=useState([])
    const [addrr,setAddrr] = useState()
    // Провайдер с подключением контракта..............................................
    let contract;
    let contractFctory;
    const provider = new ethers.BrowserProvider(window.ethereum); 
    contract = new Contract("0x59f496E5580B7dF7de7BFAAF629eBf88B9CD0a15", abi, provider)
    contractFctory = campaingFactory
    //..................................................................................


    let address = ["0x59f496E5580B7dF7de7BFAAF629eBf88B9CD0a15","0x0cf20925394275b0B177813c88E1FB5E5DBA8922","0x894fc722Eac35af3d8e4D492C6f4b242ace6395D"] // Массив с адресами контрактов 


    //Получение имени..................................................................
    useEffect(() => {
      (async () => {
         setName( await contract.name())
      })()
    },[])
    useEffect(() => {
      (async () => {
        console.log( await contractFctory.campaingsCount() ,"Число компаний")
        console.log(1)
      })()
    },[])
    
    //.................................................................................

    function getName(e) {
      setFind(e.target.value);
    }
    function getCategory(e) {
      setCategory(e.target.value);
    }
    function getCountry(e) {
      setCountry(e.target.value);
    }
    
    useEffect(() => {
      const filteredName = filterName(findName, findCategory, findCountry, compony);
      setItems(filteredName);
    }, [fin]);

    function handleSubmit(e) {
      setFin(!fin);
      e.preventDefault();
    }
    function modal(index){

        setModalActive(true)
        setForModal(items[index])
        if(index <= 3){
           setAddrr(address[index])// Тут получаем индекс из кнопки и передаём переменной addrr элемент массива address
        }else setAddrr(address[0])
        
    }
    console.log(forModal)
   
   return (
    <>
    {/* Тут в Modal мы передаёи пропсы ,соответственно address={addrr} это передача адреса */}
    <Modal active={modalActive} setActive={setModalActive} items={forModal} address={addrr} /> 
    <div className="flex font-Chewy flex-col ">
    <div className="flex  justify-center  p-16">
    <form className=" w-3/5 " onSubmit={handleSubmit}>
        <input type="search" className="w-10/12 h-[46px] text-[20px] border border-solid border-gray-300 rounded-l-lg  indent-2  " placeholder="Search by name..." value={findName} onChange={getName} />
        <input type="submit"className="bg-blue h-[48px] -ml-1 text-[20px] text-white border rounded-r-lg  w-2/12" value="Search" />
        <div className="w-full flex justify-center">
        <select className="w-1/3 p-1 rounded-lg mr-2  border border-solid indent-2 border-gray-300 bg-white  mt-2 text-[20px]" onChange={getCategory}>
        <option value="All">Filter by category</option>
        {list2.map(list => <option>{list}</option>)}
        </select>
        <select className="w-1/3 border border-solid  bg-white-r rounded-lg indent-2 border-gray-300 mt-2 text-[20px]" onChange={getCountry}>
          <option value="All">Country</option>
          {list.map(item => item)}
        </select>
        </div>
      </form>
    </div>
    <div className=" flex  justify-center">
        <ul className=" flex   w-[1250px]  ">
 <div className="  flex   w-full flex-wrap ">
          {items.map((item, index) => (
            <li key={index}>
                <div className="flex bg-white-r items-center text-[25px] rounded-lg  p-9 ml-7 mt-3 mb-4 flex-col drop-shadow-xl">
                {item.image}
                {item.name} 
                <button onClick={()=>modal(index)} className="text-[17px] w-10/12 rounded-lg h-10 mt-4 text-white bg-blue">Learn more</button>
                </div>
                </li>
          ))}
  </div>
        </ul>
    
      </div>
      </div>
    </>
    )
}




