import Faker from 'faker/locale/ru'

const List = []
const count = 3
const countArray = new Array(count).fill(1)

countArray.forEach((item) => {
  // Получаем фейк данные юзера
  const data = Faker.helpers.userCard()
  const addData = {
    id: Faker.random.number(),
    avatar: Faker.image.avatar(),
    about: Faker.lorem.paragraph(),
  }
  // Добавляем доп. поля
  List.push({
    ...addData,
    ...data,
  })
  return item
})

export default List
