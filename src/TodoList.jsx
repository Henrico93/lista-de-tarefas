import React, { useState, useEffect } from "react";
import './TodoList.css'
import Icone from './assets/icon.webp'

function TodoList() {

    const ListaStorage = localStorage.getItem('Lista');
    const [Lista, setLista] = useState(ListaStorage ? JSON.parse( ListaStorage ) : []);
    const [novoItem, setNovoItem] = useState("")

    useEffect(()=>{
        localStorage.setItem('Lista', JSON.stringify(Lista));
    },[Lista])

    function adicionaItem(form) {
        form.preventDefault();
        if(!novoItem){
            return;
        }
        setLista([...Lista, {text: novoItem, isCompleted: false}])
        setNovoItem("");
        document.getElementById('input-entrada').focus();

    }
    
    function clicou(index){
        const listaAux = [...Lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted; 
        setLista(listaAux);
    }

    function deleta(index){
        const listaAux = [...Lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    function deletaTudo(){
        setLista([]);
    }


    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input 
                    id="input-entrada"
                    type="text" 
                    value={novoItem}
                    onChange={(e)=>{setNovoItem(e.target.value)}}
                    placeholder="Adicione uma tarefa"
                />
                <button className="add" type="submit">Add</button>
            </form>
            <div className="listaTarefas">
                <div style={{textAlign:'center'}}>
                {
                    Lista.length < 1
                        ?
                        <img className="icone-central" src={Icone}/>
                        :
                        Lista.map((item, index) => (
                            <div 
                                key={index}
                                className={item.isCompleted ?  "item completo" : "item"} 
                            >
                                <span onClick={() => { clicou(index) }}>{item.text}</span>
                                <button onClick={() => {deleta(index)}} className="del">Deletar</button>
                            </div>
                        ))
                }
                {
                    Lista.length > 0 && 
                    <button onClick={() => { deletaTudo()}} className="deleteAll">Deletar todas</button>
                }
                
            </div>
        </div>
    </div>
    )
}

export default TodoList