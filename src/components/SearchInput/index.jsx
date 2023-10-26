import './styles.css'

export const SearchInput = (props) => {

  const { searchValue, handleChange } = props

  return (
    <div className='search-input-container'>

      {!!searchValue && (
        <div>
          <h1>search: {searchValue}</h1>
        </div>
      )}

      <inputkk 
        onChange={handleChange}
        type="text"
        value={searchValue}
      />

    </div>
  )
} 