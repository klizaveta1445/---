export const categories = [
    {value: 'all', label: 'Все'},
    {value: 'nature', label: 'Природа'},
    {value: 'animals', label: 'Животные'},
]

const photos = [
    {id: 1, category: 'nature', author: 'Крош', date: '12.05.2025', title: 'Речной каньон',
    text: 'Река, которая нашла дорогу между скал.', src: "assets/1.jpg"},
    {id: 2, category: 'nature', author: 'Ёжик', date: '03.06.2025', title: 'Горная долина',
    text: 'Утренний туман над горами.', src: "assets/2.jpg"},
    {id: 3, category: 'animals', author: 'Нюша', date: '21.06.2025', title: 'Чёрный щенок',
    text: 'Самый любопытный житель двора.', src: "assets/3.jpg"},
    {id: 4, category: 'animals', author: 'Бараш', date: '08.07.2025', title: 'Мопс в одеяле',
    text: 'Тёплый уголок для отдыха.', src: "assets/4.jpg"},
    {id: 5, category: 'animals', author: 'Лосяш', date: '15.07.2025', title: 'Лев на отдыхе',
    text: 'Король саванны в послеобеденный час.', src: "assets/5.jpg"},
    {id: 6, category: 'nature', author: 'Совунья', date: '30.07.2025', title: 'Лес у озера',
    text: 'Тихое место для долгих прогулок.', src: "assets/6.jpg"},
    {id: 7, category: 'animals', author: 'Копатыч', date: '11.08.2025', title: 'Бурый медведь',
    text: 'Хозяин леса вышел на прогулку.', src: "assets/7.jpg"},
]

const firstPhoto = {...photos[0]}

let nextId = Math.max(...photos.map(p => p.id)) + 1

export function getPhotos(category = 'all') {
    if (category === 'all') return [...photos]
    return photos.filter(photo => photo.category === category)
}

export function getPhotoById(id) {
    return photos.find(photo => photo.id === id)
}

export function addPhoto() {
    const source = photos.length > 0 ? photos[0] : firstPhoto
    photos.push({...source, id: nextId++})
}

export function deletePhoto(id) {
    const index = photos.findIndex(photo => photo.id === id)
    if (index !== -1) photos.splice(index, 1)
}
