import { useEffect, useRef, useState } from "react"

export const Form = () => {
    const [food, setFood] = useState([]);
    const [reciepe, setReciepe] = useState("");
    const [incredents, setIncredents] = useState("");
    const [time, setTime] = useState("");
    const [instruction, setInstruction] = useState("");
    const [itemdetail, setItemdetail] = useState([]);
    // const [img, setImg] = useState("");

    const titleInput = useRef("");
    const incrdInput = useRef("");
    const timeInput = useRef("");
    const instruInput = useRef("");

    function create(e) {
        e.preventDefault();

        // let image = img;

        const create = {
            title: reciepe,
            incredents: incredents,
            time: time,
            instruction: instruction
        }

        fetch("http://localhost:8000/food", {
            method: "POST",
            body: JSON.stringify(create),
            headers: {
                "content-type": "application/json"
            }
        });
        setFood([...food, create]);
        instruInput.current.value = "";
        titleInput.current.value = "";
        incrdInput.current.value = "";
        timeInput.current.value = "";
    };

    const [show, setShow] = useState(false);

    function detail(item) {
        setItemdetail(itemdetail.pop());
        setItemdetail([...itemdetail, item]);
        setShow(true);
        // console.log(item)
        // console.log(itemdetail);
    }

    useEffect(() => {
        fetch("http://localhost:8000/food").then((res) => res.json()).then((res) => { setFood(res) });
    }, []);

    return (
        <div className="enter">


            <div id="wrapper">
                <form onSubmit={create}>
                    <input ref={titleInput} type="text" placeholder="Enter reciepe title" id="title" onChange={(e) => { setReciepe(e.target.value) }} />
                    <br /><br />
                    <input ref={incrdInput} type="text" placeholder="Enter incredients" onChange={(e) => { setIncredents(e.target.value) }} />
                    <br /><br />
                    <input ref={timeInput} type="number" placeholder="Time to cook" onChange={(e) => { setTime(e.target.value) }} />
                    <br /><br />
                    <textarea ref={instruInput} cols="30" rows="10" placeholder="Enter instructions to cook reciepe" style={{ resize: "none" }} onChange={(e) => { setInstruction(e.target.value); }}></textarea>
                    <br /><br />
                    {/* <input type="file" onChange={onImageChange}/>
                <br /><br /> */}
                    <input type="submit" value="Submit" />
                </form>
                <div className="li_recipie">
                    <h3><u>Reciepe List</u></h3>

                    <div className="borad">
                        <button>Sort Time +</button>
                        <button>Sort Time -</button>
                        {food.map((item, i) => (
                            <li key={i} onClick={() => { detail(item) }}><b>Title: "</b>{item.title} " <b>Time: "</b>{item.time}"min</li>
                        ))}
                    </div>
                </div>

            </div>
            <div className="recipie_d">


                {show ? <div id="detail" >
                    <h3><u>Reciepe Detail</u></h3>
                    <div>
                        <h1>Title: {itemdetail[0].title}</h1>
                        <h1>Time to prepare: {itemdetail[0].time} min</h1>
                        <h1>Incredients: {itemdetail[0].incredents}</h1>
                        <h1>Instruction to cook: {itemdetail[0].instruction}</h1>
                    </div>
                </div> : null}
            </div>
        </div>
    )
}