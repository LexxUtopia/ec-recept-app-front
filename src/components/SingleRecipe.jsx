import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipe } from '../services/recipeService';

export const SingleRecipe = () => {
    const [recipe, setRecipe] = useState(undefined);
    const { recipeId } = useParams();

    useEffect(() => {
        let controller = new AbortController();
        (async () => {
            const recipe = await getRecipe(recipeId);
            if (recipe) setRecipe(recipe);
        })();
        return () => controller?.abort();
    }, [recipeId])

    return (
        <div className="SingleRecipe">
            <div className="row bg-secondary p-2">
                <div className="col p-1"><img className="rounded shadow-sm" src="image 2.jpg" alt="" /></div>
                <div className="col p-1"><img className="rounded shadow-sm" src="image-3.jpg" alt="" /></div>
                <div className="col p-1"><img className="rounded shadow-sm" src="image-4.jpg" alt="" /></div>
                <div className="col p-1"><img className="rounded shadow-sm" src="image-5.jpg" alt="" /></div>
                <div className="col p-1"><img className="rounded shadow-sm" src="image-8.jpg" alt="" /></div>
                <div className="col p-1"><img className="rounded shadow-sm" src="image-9.jpg" alt="" /></div>
                <div className="col p-1"><img className="rounded shadow-sm" src="image-10.jpg" alt="" /></div>
            </div>
            {recipe ? (
                <div className="single-recept-container">
                    <div className="recept-box">
                        <div className="left-box">
                            <div className="recept-title">
                                <h2>{recipe.title}</h2>
                            </div>
                            <div className="recept-description">
                                <p>{recipe.description}</p>  
                            </div>
                            <div>
                                <h5>Gör så här:</h5>
                                <ul>
                                {recipe.instruction?.map(item =>{
                                    return <li>{item}</li>
                                })}
                                
                                </ul>
                            </div>
                        </div>
                        <div className="right-box">
                            <div className="ingredients-box">
                                <h5>
                                    Ingredients
                                </h5>
                            </div>
                            <div className="ingredients-text">
                                <ul>
                                    {recipe.ingredients?.map(item => {
                                        return <li>{item}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                </div>)
                : (<img alt="loading" src="loading.svg"></img>)
            }
        </div>
    )
}