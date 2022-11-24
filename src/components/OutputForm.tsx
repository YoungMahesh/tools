
interface ListProps {

	resultText: string
	activeTab: 1 | 2
}

const OutputForm = ({  resultText, activeTab }: ListProps) => {

	const copyText = (text: string) => {
		navigator.clipboard.writeText(text)
		alert(`Copied: \n${text}`)
	}

	return (
		<form style={{ display: activeTab === 2 ? 'none' : 'block' }}>
			<div className='form-left-part'>
				<label> Result: </label>
				<textarea value={resultText} readOnly></textarea>
			</div>

			<div className='form-right-part'>
				<input type='button' value='Copy' onClick={() => copyText(resultText)} />
			</div>

		</form>
	)
}

export default OutputForm