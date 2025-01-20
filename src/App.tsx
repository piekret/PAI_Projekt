import { Router } from './components/Router'
import { RecipeProvider } from './context/RecipeProvider'

function App() {
  return (
    // Router zawartu w providerze aby nie było błędów
    <RecipeProvider>
      <Router />
    </RecipeProvider>
  )
}

export default App