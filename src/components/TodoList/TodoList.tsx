import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Todo, { ITask } from './Todo/Todo'

const TASKS: ITask[] = [
    { title: 'Написать пост в свой канал', id: 1 },
    { title: 'Обсудить новости с подписчиками', id: 2 },
    { title: 'Пообниматься с эдулей', id: 3 },
]

const TodoList = () => {
    const [tasks, setTasks] = useState<ITask[]>(TASKS)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Список задач на сегодня</Text>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {tasks.map((task) => (
                    <Todo key={task.id} {...task} />
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 600,
        paddingLeft: 14,
    },
    container: {
        width: '100%',
        flexDirection: 'column',
    },
})

export default TodoList
