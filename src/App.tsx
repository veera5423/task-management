import { useState } from 'react'
import { TodoItem } from './components/TodoItem'
import { TodoForm } from './components/TodoForm'
import { TodoFilter } from './components/TodoFilter'
import { Header } from './components/Header'
import { Analytics } from './components/Analytics'
import { Settings } from './components/Settings'
import { Footer } from './components/Footer'
import HowToUse from './pages/HowToUse'
import { useTodos } from './hooks/useTodos'
import { SettingsProvider } from './contexts/SettingsContext'
import type { TodoFilter as FilterType, View } from './types/todo'
import styles from './App.module.css'

function AppContent() {
  const { todos, addTodo, toggleTodo, editTodo, deleteTodo } = useTodos()
  const [filter, setFilter] = useState<FilterType>('all')
  const [currentView, setCurrentView] = useState<View>('tasks')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const handleViewChange = (view: View) => {
    setCurrentView(view)
  }

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const renderContent = () => {
    switch (currentView) {
      case 'analytics':
        return <Analytics />
      case 'settings':
        return <Settings onThemeChange={handleThemeChange} currentTheme={theme} />
      case 'how-to-use':
        return <HowToUse />
      default:
        return (
          <>
            <TodoForm onAdd={addTodo} />
            <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
            <div className={styles.todoList}>
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onEdit={editTodo}
                  onDelete={deleteTodo}
                />
              ))}
              {filteredTodos.length === 0 && (
                <p className={styles.emptyMessage}>
                  {filter === 'all'
                    ? 'No todos yet. Add one above!'
                    : filter === 'active'
                    ? 'No active todos!'
                    : 'No completed todos!'}
                </p>
              )}
            </div>
          </>
        )
    }
  }

  return (
    <>
    
    <div className={`${styles.app} ${styles[theme]}`}>
      <Header 
        onViewChange={handleViewChange} 
        currentView={currentView} 
        currentTheme={theme}
        onThemeChange={handleThemeChange}
      />
      <div className={styles.container}>
        {renderContent()}
      </div>
      <Footer />
    </div>
    </>
  )
}

export default function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  )
}
