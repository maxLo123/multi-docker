import { useEffect, useState } from 'react'
import axios from 'axios'

const Fib = () => {
    const [seenIndexes, setSeenIndexes] =  useState([])
    const [values, setValues] =  useState({})
    const [index, setIndex] =  useState('')

    useEffect(() => {
        const fetchValues = async () => {
            try {
                const valuesRes = await axios.get('/api/values/current')
                setValues(valuesRes.data);
            } catch(error) {
                console.error(error)
            }
        }   

        const fetchIndexes = async () => {
            try {
                const seenIndexesRes = await axios.get('/api/values/all')
                setSeenIndexes(seenIndexesRes.data);
            } catch(error) {
                console.error(error)
            }
        }

        fetchValues();
        fetchIndexes();

    }, [])

    async function handleSubmit(event) {
        event.preventDefault();

        await axios.post('/api/values', {
            index: index
        })

        setIndex('');
    }

    function renderSeenIndexes(){
        return seenIndexes.map(({number}) => number).join(', ')
    }

    function renderValues() {
        const entries = [];

        for(let key in values){
            entries.push(
                <div key={key}>
                    For index {key} I calculated {values[key]}
                </div>
            )
        }

        return entries;

    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your index:</label>
                <input value={index} onChange={event => setIndex(event.target.value)}/>
                <button>Submit</button>
            </form>

            <h3>Indexes I have seen:</h3>
            {renderSeenIndexes()}

            <h3>Calculated values:</h3>
            {renderValues()}
        </div>
    )
}

export default Fib;