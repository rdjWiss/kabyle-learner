export type VocabItem = {
	kabyle: string
	english: string
}

export type Lesson = {
	id: string
	title: string
	vocab: VocabItem[]
	examples: string[]
}