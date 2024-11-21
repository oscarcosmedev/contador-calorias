import { useState, ChangeEvent } from "react"
import { Activity } from "../types"
import { categories } from "../data/categories"

export default function Form() {

    const [activity, setActivity] = useState<Activity>({
        category: 1,
        nameActivity: '',
        calories: 0
    })

    // Escuchamos si algo cambio
    const handleChange = (e : ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        // console.log('algo cambio')

        const insNumberField = ['category', 'calories'].includes(e.target.id) // verificamos cual debe ser de tipo 'Number', antes de setear al State
        
        setActivity({
            ...activity,
            [e.target.id]: insNumberField ? +e.target.value : e.target.value
        })

    }

    const isValidActivity = () => {
        const {nameActivity, calories} = activity
        console.log(nameActivity.trim() !== '' && calories > 0)
        return nameActivity.trim() !== '' && calories > 0
    }

  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg">
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categoría:</label>
            <select 
                className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                id="category"
                value={activity.category}
                onChange={handleChange}
            >
                {
                    categories.map(category => (
                        <option 
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))
                }
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="nameActivity" className="font-bold">Actividad:</label>
            <input 
                id="nameActivity"
                type="text"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Ej. Comida, Juego de naranja, Ensalada, Ejercicios, Pesas, Bicicleta"
                value={activity.nameActivity}
                onChange={handleChange}
            />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorías:</label>
            <input 
                id="calories"
                type="number"
                className="border border-slate-300 p-2 rounded-lg"
                placeholder="Ej. 300 - 500"
                value={activity.calories}
                onChange={handleChange}
            />
        </div>

        <input 
            type="submit"
            className=" bg-gray-800 hover:bg-gray-900 text-white font-bold w-full p-2 uppercase disabled:opacity-10"
            value="Guardar actividad"
            disabled={!isValidActivity()}
        />
    </form>
  )
}
