const yearsSelect = document.querySelector('.years')
const result = document.querySelector('.result')

const handleYearSelected = () => {
  const signNumber = getSignNumber(yearsSelect.value)
  result.textContent = showResultsOutput(YEARS_TO_SIGN_MAPPER[signNumber])
}

document.addEventListener('DOMContentLoaded', () =>
  yearsSelect.addEventListener('change', handleYearSelected)
)
