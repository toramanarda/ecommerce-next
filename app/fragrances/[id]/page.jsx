import {notFound} from "next/navigation";

export default async function FragrancesDetail({params}) {
  const { id } = params;

  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);

    if(!response.ok) {
      return notFound();
    }

    const data = await response.json();

    return(
      <div className="ProductDetails">
        <div className="ProductsDetail">
          <h1 className="font-extrabold">Ürün Detayı - {id}</h1>
          <h2>{data.title}</h2>
          <img src={data.thumbnail} alt={data.title} />
        </div>
        <div className="Comments">
          <h5>{data.description}</h5>
          {data.reviews.map(x => (
            <li className="comments-list">
              <p><strong>{x.reviewerName}:</strong>{x.comment}</p>
              <p>{x.date}</p>
            </li>
          ))}
          <hr />
          <span className="BudgetBtns">
            <button>➖</button>
              <span>0</span>
            <button>➕</button>
          </span>
          <button className='AddBtn'>Add to cart</button>
        </div>
      </div>
    )
  } catch (error) {
    throw new Error("Sunucuda bir hata oluştu");
  }
}