import React, { useEffect, useState } from 'react'
import { FlatList, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Todo from './Todo/Todo'
import { ITask } from '../../types'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

const STORAGE_KEY_TASK = 'TASKS_STORAGE'
const STORAGE_KEY_COUNTER_TASK = 'COUNTER_TASKS_STORAGE'
const STORAGE_KEY_LAST_SAVED_DATE = 'LAST_SAVED_DATE'

const TodoList = () => {
    const [value, setValue] = useState<string>('')
    const [tasks, setTasks] = useState<ITask[]>([])
    const [countTask, setCountTask] = useState<number>(0)

    useEffect(() => {
        checkForNewDay()
        loadTasks()
        loadCounter()
    }, [])

    useEffect(() => {
        saveTasks(tasks)
    }, [tasks])

    useEffect(() => {
        saveCounter(countTask)
    }, [countTask])

    const checkForNewDay = async () => {
        const currentDate = new Date().toLocaleDateString()
        const lastSavedDate = await AsyncStorage.getItem(STORAGE_KEY_LAST_SAVED_DATE)

        // Если сохраненная дата отличается от текущей, очищаем данные
        if (lastSavedDate !== currentDate) {
            clearStorage()
        }
    }

    const loadTasks = async () => {
        try {
            const savedTasks = await AsyncStorage.getItem(STORAGE_KEY_TASK)
            if (savedTasks) {
                setTasks(JSON.parse(savedTasks))
            }
        } catch (error) {
            console.error('Ошибка загрузки задач:', error)
        }
    }

    const saveTasks = async (tasks: ITask[]) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY_TASK, JSON.stringify(tasks))
            const currentDate = new Date().toLocaleDateString()
            await AsyncStorage.setItem(STORAGE_KEY_LAST_SAVED_DATE, currentDate)
        } catch (error) {
            console.error('Ошибка сохранения задач:', error)
        }
    }

    const loadCounter = async () => {
        try {
            const savedCounter = await AsyncStorage.getItem(STORAGE_KEY_COUNTER_TASK)
            if (savedCounter) {
                setCountTask(Number(savedCounter))
            }
        } catch (error) {
            console.error('Ошибка загрузки счётчика задач:', error)
        }
    }

    const saveCounter = async (count: number) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY_COUNTER_TASK, count.toString())
        } catch (error) {
            console.error('Ошибка сохранения счётчика задач:', error)
        }
    }

    const clearStorage = async () => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY_TASK)
            await AsyncStorage.removeItem(STORAGE_KEY_COUNTER_TASK)
            setTasks([]) // Сбросить задачи в состоянии
            setCountTask(0) // Сбросить счётчик выполненных задач
        } catch (error) {
            console.error('Ошибка очистки хранилища:', error)
        }
    }

    const markTaskAsDone = (id: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === id ? { ...task, isCompleted: true } : task))
        )
        setCountTask((prevState) => prevState + 1)
    }

    const removeTask = (id: number) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    }

    const addTask = () => {
        if (value.trim()) {
            const newTask: ITask = {
                title: value,
                isCompleted: false,
                id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
            }
            setTasks((prevTasks) => [...prevTasks, newTask])
            setValue('')
        }
    }

    return (
        <FlatList
            style={styles.container}
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={
                <>
                    <Text style={styles.title}>Список задач на сегодня</Text>
                    <TextInput
                        placeholder="Введите название задачи"
                        value={value}
                        style={styles.textInput}
                        onChangeText={setValue}
                    />
                    <TouchableOpacity style={styles.iconButton} onPress={addTask}>
                        <FontAwesome6 name="add" size={28} color="white" />
                    </TouchableOpacity>
                    <Text
                        style={styles.counterTask}
                    >{`Задач выполнено сегодня: ${countTask}`}</Text>
                </>
            }
            renderItem={({ item }) => (
                <Todo
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    isCompleted={item.isCompleted}
                    removeTask={removeTask}
                    markTaskAsDone={markTaskAsDone}
                />
            )}
            contentContainerStyle={styles.flatListContent}
        />
    )
}

const styles = StyleSheet.create({
    counterTask: {
        fontSize: 20,
        fontWeight: '600',
        paddingLeft: 14,
    },
    iconButton: {
        backgroundColor: 'green',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        position: 'absolute',
        top: 46,
        right: 26,
    },
    textInput: {
        flexWrap: 'wrap',
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
        fontWeight: '600',
        paddingLeft: 14,
    },
    container: {
        width: '100%',
        flexDirection: 'column',
    },
    flatListContent: {
        paddingBottom: 120,
    },
})

export default TodoList
