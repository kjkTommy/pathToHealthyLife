import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Todo from './Todo/Todo'
import { ITask } from '../../types'
import AntDesign from '@expo/vector-icons/AntDesign'

const TASKS: ITask[] = []
const STORAGE_KEY = 'TASKS_STORAGE'

const TodoList = () => {
    const [value, setValue] = useState('')
    const [tasks, setTasks] = useState<ITask[]>(TASKS)

    useEffect(() => {
        loadTasks()
    }, [])

    useEffect(() => {
        saveTasks(tasks)
    }, [tasks])

    const loadTasks = async () => {
        try {
            const savedTasks = await AsyncStorage.getItem(STORAGE_KEY)
            if (savedTasks) {
                setTasks(JSON.parse(savedTasks))
            }
        } catch (error) {
            console.error('Ошибка загрузки задач:', error)
        }
    }

    const saveTasks = async (tasks: ITask[]) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
        } catch (error) {
            console.error('Ошибка сохранения задач:', error)
        }
    }

    const removeTask = (id: number) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    }

    const addTask = () => {
        if (value.trim()) {
            const newTask: ITask = {
                title: value,
                id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
            }
            setTasks((prevTasks) => [...prevTasks, newTask])
            setValue('')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Список задач на сегодня</Text>
            <TextInput
                placeholder="Введите название задачи"
                value={value}
                style={styles.textInput}
                onChangeText={setValue}
            />
            <TouchableOpacity style={styles.iconButton} onPress={addTask}>
                <AntDesign name="check" size={24} color="white" />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {tasks.map((task) => (
                    <Todo key={task.id} {...task} removeTask={removeTask} />
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    iconButton: {
        backgroundColor: 'green',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        position: 'absolute',
        top: 48,
        right: 26,
    },
    textInput: {
        width: '94%',
        fontSize: 16,
        height: 70,
        marginLeft: 12,
        marginVertical: 8,
        justifyContent: 'center',
        paddingLeft: 20,
        backgroundColor: 'white',
        shadowOpacity: 0.08,
        borderRadius: 12,
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowRadius: 10,
    },
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
