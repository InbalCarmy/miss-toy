import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet, useSearchParams } from 'react-router-dom'
import { ToyFilter } from '../cmps/ToyFilter'
import { ToyList } from '../cmps/ToyList'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service'
import { getExistingProperties } from '../services/util.service'
import { loadToys, removeToy, setFilterBy } from '../store/toy/toy.actions'

export function ToyIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)

  useEffect(() => {
    const URLfilter = toyService.getFilterFromSearchParams(searchParams)
    setFilterBy(URLfilter)
    loadToys()
  }, [searchParams])

  function onSetFilterBy(nextFilter) {
    setSearchParams(getExistingProperties(nextFilter))
  }

  function onRemoveToy(toyId) {
    removeToy(toyId)
      .then(() => showSuccessMsg('Toy Was Removed!'))
      .catch(() => showErrorMsg(`Having issues removing Toy (${toyId})`))
  }

  const { name, inStock, labels, sortBy } = filterBy
  return (
    <section className="toy-index">
      <h1>Welcome! this is our toys:</h1>
      <main>
        <ToyFilter onSetFilterBy={onSetFilterBy} filterBy={{ name, inStock, labels, sortBy }} />
        <Link className="add-link" to="/toy/edit">
          Add Toy
        </Link>
        <ToyList toys={toys} onRemoveToy={onRemoveToy} />
        <Outlet />
      </main>
    </section>
  )
}
