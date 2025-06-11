from flask import Flask, session, render_template, redirect, url_for

app = Flask(__name__)

# Necesitamos una clave secreta para manejar las sesiones
app.secret_key = 'supersecretkey'

# Rutas para obtener los nodos
@app.route('/')
def index():
    # Si no hay xp en la sesión, inicializamos con 0 XP
    if 'xp' not in session:
        session['xp'] = 0  # El primer nodo tiene 0 XP

    # Definimos los 3 nodos con XP estático
    nodos = [
        {'id': 0, 'xp_required': 0, 'class': 'checkpoint current'},  # Nodo 1 con 0 XP
        {'id': 1, 'xp_required': 15, 'class': 'checkpoint locked'},  # Nodo 2 con 15 XP
        {'id': 2, 'xp_required': 30, 'class': 'checkpoint locked'},  # Nodo 3 con 30 XP
    ]
    
    # Asignamos las clases basadas en el XP del usuario
    for nodo in nodos:
        if session['xp'] >= nodo['xp_required']:
            if session['xp'] >= nodo['xp_required'] + 15:
                nodo['class'] = 'checkpoint completed'  # Nodo completado
            else:
                nodo['class'] = 'checkpoint current'  # Nodo actual

    return render_template('index.html', xp=session['xp'], nodos=nodos)

# Ruta para completar un nodo y obtener XP
@app.route('/complete_node')
def complete_node():
    # Agregar 15 XP al completar un nodo, excepto el primer nodo
    if session['xp'] == 0:
        session['xp'] = 15  # Al completar el primer nodo, pasa a 15 XP
    else:
        session['xp'] += 15  # Incrementamos 15 XP por cada nodo completado
    
    return redirect(url_for('index'))

@app.route('/lesson/<int:lesson_id>')
def lesson(lesson_id):
    # Redirigir a la lección correspondiente
    if lesson_id == 1:
        return render_template('lesson1.html')
    elif lesson_id == 2:
        return render_template('lesson2.html')
    else:
        return "Lección no encontrada", 404
    
@app.route('/exam1')
def exam1():
    return render_template('exam1.html')


if __name__ == "__main__":
    app.run(debug=True)
