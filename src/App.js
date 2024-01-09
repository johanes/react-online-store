const App = () => {

  const categories = [
    {
      id: 1,
      title: 'Hats',
      backgroundImgSource: ''
    },
    {
      id: 2,
      title: 'Jackets',
      backgroundImgSource: ''
    },
    {
      id: 3,
      title: 'PC Gear',
      backgroundImgSource: ''
    },
    {
      id: 4,
      title: 'Funkos',
      backgroundImgSource: ''
    },
    {
      id: 5,
      title: 'Action Figures',
      backgroundImgSource: ''
    },
  ]

  return (
    <div className="categories-container">
      {categories.map(({id, title}) => (
        <div key={id} className="category-container">
        <div className="category-background-img"/>
        <div className="category-body-container">
          <h2>{title}</h2>
          <p>Shop Now</p>
        </div>
      </div>
      ))}
      
    </div>
  );
}

export default App;
