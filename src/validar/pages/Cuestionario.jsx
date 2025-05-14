import React, { useState, useEffect, useCallback, memo } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import { pass, urlBase } from '../../api';
import CryptoJS from "crypto-js";


// Memoize the Question component to prevent unnecessary rerenders
const Question = memo(({ pregunta, depth = 0, onAnswer, answers }) => {
    const marginLeft = depth * 4;
    const [showSubquestions, setShowSubquestions] = useState(false);

    const parseDependencyValue = useCallback((value) => {
        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    }, []);

    const checkDependencyMatch = useCallback((actual, expected) => {
        if (Array.isArray(expected)) {
            return expected.some(e => actual?.includes(e));
        }
        if (typeof actual === 'boolean') {
            expected = true;
            return actual === expected;
        }
        // Add a special case for string comparisons by normalizing to uppercase
        if (typeof actual === 'string' && typeof expected === 'string') {
            return actual.toUpperCase() === expected.toUpperCase();
        }
        return actual?.toString() === expected?.toString();
    }, []);

    // Verificar dependencia de pregunta padre
    useEffect(() => {
        if (!pregunta.depende_de) return;
        const parentAnswer = answers[pregunta.depende_de]?.texto;
        const expectedValue = parseDependencyValue(pregunta.depende_respuesta);
        const shouldShow = checkDependencyMatch(parentAnswer, expectedValue);
        setShowSubquestions(shouldShow);
    }, [answers, pregunta.depende_de, pregunta.depende_respuesta, parseDependencyValue, checkDependencyMatch]);

    const handleAnswer = useCallback((value, optionText, tipo, valor) => {
        // Store both the value (id) and the text for reference
        onAnswer(pregunta.id, value, optionText, tipo, valor);

        // This should only trigger for questions that HAVE subquestions, not ones that depend on others
        if (pregunta.subpreguntas && pregunta.subpreguntas.length > 0) {
            // For questions with subquestions, we're showing them based on the answer to THIS question
            const valueToCompare = typeof optionText === 'string' ? optionText : value;

            // The parent question's answer should automatically show its subquestions
            // (each subquestion will individually check if it should be visible based on its own dependency settings)
            // If answering the parent question, show subquestions
            setShowSubquestions(true);

            // Cleanup answers of hidden subquestions if the parent answer changed
            if (pregunta.subpreguntas && answers[pregunta.id]?.valor !== value) {
                const cleanupSubquestionAnswers = (subqs) => {
                    subqs.forEach(subq => {
                        // Remove the answer for this subquestion
                        onAnswer(subq.id, undefined, undefined, undefined);

                        // Recursively cleanup nested subquestions
                        if (subq.subpreguntas && subq.subpreguntas.length > 0) {
                            cleanupSubquestionAnswers(subq.subpreguntas);
                        }
                    });
                };

                cleanupSubquestionAnswers(pregunta.subpreguntas);
            }

            // We don't need to manually check dependencies here because each subquestion 
            // will check its own dependency condition in its own useEffect when it renders
        }
    }, [onAnswer, pregunta.id, pregunta.depende_respuesta, parseDependencyValue, checkDependencyMatch, pregunta.subpreguntas]);

    const renderInput = useCallback(() => {
        switch (pregunta.tipo) {
            case 'opcion_unica':
                return (
                    <div className="grid gap-2">
                        {pregunta.opciones.map((opcion) => (
                            <label key={opcion.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                                <input
                                    type="radio"
                                    name={`pregunta-${pregunta.id}`}
                                    checked={answers[pregunta.id]?.valor === opcion.id }
                                    onChange={() => handleAnswer(opcion.id, opcion.texto, 'opcion_unica', opcion.valor)}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span>{opcion.texto}</span>
                            </label>
                        ))}
                    </div>
                );

            case 'opcion_multiple':
                return (
                    <div className="grid gap-2">
                        {pregunta.opciones.map((opcion) => (
                            <label key={opcion.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                                <input
                                    type="checkbox"
                                    checked={answers[pregunta.id]?.valor?.includes(opcion.id) || false}
                                    onChange={(e) => {
                                        const currentValues = answers[pregunta.id]?.valor || [];
                                        const currentSum = answers[pregunta.id]?.calificacion || (pregunta.id === 15 ? 4 : 0);
                                        const newValue = e.target.checked
                                            ? [...currentValues, opcion.id]
                                            : currentValues.filter(id => id !== opcion.id);
                                        const newSum = e.target.checked
                                            ? currentSum + opcion.valor
                                            : currentSum - opcion.valor;
                                        handleAnswer(newValue, opcion.texto, 'opcion_multiple', newSum);
                                    }}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span>{opcion.texto}</span>
                            </label>
                        ))}
                        {/* <div className="mt-2 font-semibold">
                            Total: {answers[pregunta.id]?.calificacion || 0}
                        </div> */}
                    </div>
                );

            case 'cantidad_por_opcion':
                return (
                    <div className="grid gap-4">
                        {pregunta.opciones.map((opcion) => (
                            <div key={opcion.id} className="flex items-center gap-4">
                                <span className="w-40">{opcion.texto}</span>
                                <input
                                    type="number"
                                    min="0"
                                    value={answers[pregunta.id]?.valor?.[opcion.id] || 0}
                                    onChange={(e) => handleAnswer({
                                        ...answers[pregunta.id]?.valor,
                                        [opcion.id]: parseInt(e.target.value) || 0
                                    }, opcion.texto, 'cantidad_por_opcion', opcion.valor)}
                                    className="border rounded p-2 w-24"
                                />
                            </div>
                        ))}
                    </div>
                );

            case 'si_no':
                return (
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => handleAnswer(true, true, 'si_no', 1)}
                            className={`px-4 py-2 rounded ${answers[pregunta.id]?.valor === true
                                ? 'bg-[#722F37] text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                        >
                            Sí
                        </button>
                        <button
                            type="button"
                            onClick={() => handleAnswer(false, false, 'si_no',0)}
                            className={`px-4 py-2 rounded ${answers[pregunta.id]?.valor === false
                                ? 'bg-[#722F37] text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                        >
                            No
                        </button>
                    </div>
                );

            case 'numero':
                return (
                    <input
                        type="number"
                        min="0"
                        value={answers[pregunta.id]?.texto || ''}
                        onChange={(e) => handleAnswer(parseInt(e.target.value) || 0, parseInt(e.target.value) || 0, 'numero', 0)}
                        className="border rounded p-2 w-32"
                    />
                );

            case 'texto_libre':
                return (
                    <textarea
                        value={answers[pregunta.id]?.texto || ''}
                        onChange={(e) => handleAnswer(e.target.value, e.target.value, 'texto_libre',0)}
                        className="border rounded p-2 w-full max-w-xl"
                        rows="4"
                        placeholder="Escribe tu respuesta aquí..."
                    />
                );

            default:
                return null;
        }
    }, [pregunta.id, pregunta.tipo, pregunta.opciones, answers, handleAnswer]);

    if (pregunta.depende_de && !showSubquestions) return null;

    return (
        <div
            className={`mb-1 ${depth > 0 ? 'border-l-2 border-blue-100 pl-4' : ''}`}
            style={{ marginLeft: `${marginLeft}rem` }}
        >
            <div className="mb-1 bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <h3 className="text-md font-semibold mb-3 text-gray-800 flex items-center">
                    <span className="mr-2">{pregunta.numero}</span> 
                    <span>{pregunta.texto}</span>
                    {pregunta.requerida && <span className="text-red-500 ml-1">*</span>}
                </h3>
                <div className="ml-2 mt-4">
                    {renderInput()}
                </div>
            </div>

            {showSubquestions && pregunta.subpreguntas?.map((subpregunta) => (
                <Question
                    key={subpregunta.id}
                    pregunta={subpregunta}
                    depth={depth + .1}
                    onAnswer={onAnswer}
                    answers={answers}
                />
            ))}
        </div>
    );
});

export const Cuestionario = ({infoRegistro}) => {
    const navigate = useNavigate();
    const [preguntas, setPreguntas] = useState([]);
    const [answers, setAnswers] = useState({});
    const [status, setStatus] = useState('loading');
    const [allRequiredAnswered, setAllRequiredAnswered] = useState(false);

    const [registroId, setRegistroId] = useState(null); // State for registroId
    const [statusBeneficiario, setStatusBeneficiario] = useState(null); // State for statusBeneficiario
    // Add state for controlling grid columns
    const [gridColumns, setGridColumns] = useState(1); // Default to 1 columns

    // Add function to check if all required questions are answered
    const checkRequiredQuestions = useCallback(() => {
        const checkSubquestions = (questions, parentVisible = true) => {
            for (const q of questions) {
                // Skip questions that aren't visible due to dependencies
                const isVisible = !q.depende_de ||
                    (answers[q.depende_de]?.texto &&
                        checkDependencyMatch(
                            answers[q.depende_de]?.texto,
                            parseDependencyValue(q.depende_respuesta)
                        ));

                // If question is required, visible, and not answered, return false
                if (q.requerida && parentVisible && isVisible &&
                    (!answers[q.id] || answers[q.id].valor === undefined)) {
                    return false;
                }

                // Check subquestions recursively if they exist
                if (q.subpreguntas && q.subpreguntas.length > 0) {
                    const subquestionsValid = checkSubquestions(q.subpreguntas, parentVisible && isVisible);
                    if (!subquestionsValid) return false;
                }
            }
            return true;
        };

        return checkSubquestions(preguntas);
    }, [preguntas, answers]);

    // Update allRequiredAnswered whenever answers change
    useEffect(() => {
        setAllRequiredAnswered(checkRequiredQuestions());
    }, [answers, checkRequiredQuestions]);

    // //Obten el id del registro
    // const registroId = infoRegistro || 1;

    useEffect(() => {
        setRegistroId(infoRegistro[0]); // Set the registroId from infoRegistro
        setStatusBeneficiario(infoRegistro[1]); // Set the statusBeneficiario from infoRegistro
    }, [infoRegistro]);

    // Efecto para cargar el cuestionario cuando el componente se monta
    useEffect(() => {
        // Función asíncrona para obtener los datos del cuestionario desde la API
        const loadQuestionnaire = async () => {
            try {
                // Realiza la petición HTTP GET al endpoint del cuestionario
                const response = await axios.get(`${urlBase}/cuestionario`);
                
                //console.log(response.data.preguntas);
            
                // Actualiza el estado con las preguntas recibidas del servidor
            
                setPreguntas(response.data.preguntas);
                
                
                // Cambia el estado a 'loaded' para indicar que la carga se completó exitosamente
                setStatus('loaded');
            } catch (error) {
                // En caso de error en la petición, actualiza el estado para mostrar mensaje de error
                setStatus('error');
            }
        };
        
        // Ejecuta la función de carga inmediatamente
        loadQuestionnaire();
        
    }, []); // Array de dependencias vacío significa que este efecto solo se ejecuta al montar el componente

    const handleAnswer = useCallback((questionId, value, text, tipo, calificacion) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: {
                ...prev[questionId],
                tipo: tipo,
                valor: value,
                texto: text,
                calificacion: calificacion
            }
        }));
    }, []);

    /**
     * Maneja el envío del formulario de cuestionario al servidor.
     * Este método se ejecuta cuando el usuario hace clic en el botón "Enviar Respuestas".
     */
    const handleSubmit = async () => {
        try {
            // Formatea las respuestas para que coincidan con el formato esperado por la API
            // Filtra respuestas sin valor definido y mapea los datos necesarios
            const formattedAnswers = Object.entries(answers)
                .filter(([_, data]) => data.valor !== undefined) // Elimina preguntas sin respuesta
                .map(([id, data]) => ({
                    pregunta_id: parseInt(id), // Convierte el ID a número entero
                    tipo: data.tipo,          // Incluye el tipo de pregunta
                    valor: data.valor,
                    calificacion:data.calificacion         // Incluye el valor de la respuesta
                }));
            //console.log('formattedAnswers', formattedAnswers);
            // Envía las respuestas al servidor
            // Usa un registro_id fijo (1) como ejemplo - en producción esto debería ser dinámico
            await axios.post(`${urlBase}/respuestas`, { 
                registro_id: registroId, // Usa el ID del registro actual   
                respuestas: formattedAnswers
            });
            
            // // Notifica al usuario sobre el éxito de la operación
            // // Success notification with SweetAlert2
            // Swal.fire({
            //     title: '¡Respuestas guardadas!',
            //     text: 'El cuestionario ha sido completado exitosamente',
            //     icon: 'success',
            //     confirmButtonText: 'Descargar PDF',
            //     confirmButtonColor: '#722F37', // Color vino
            // }).then((result) => {
            //     if (result.isConfirmed) {
            //         // Trigger PDF download
            //         //Servicio para generar pdf
            //         switch (statusBeneficiario) {
            //             case '100':
            //         navigate(`../Fum-Pdf/${registroId}`);
            //                 break;
            //             case '300':
            //                 navigate(`../Permanencia/${registroId}`);
            //                 break;
            //             case '300':
            //                 navigate(`../Fum-Pdf/${registroId}`);
            //                 break;
            //             }
            //     }
            // });
            Swal.close();
            Swal.fire({
                title: '¡Respuestas guardadas!',
                text: 'El cuestionario ha sido completado exitosamente. Puedes descargar el FUB ahora.',
                icon: 'success',
                confirmButtonText: 'Descargar FUB',
                confirmButtonColor: '#722F37', // Color vino
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(`../Fum-Pdf/${ CryptoJS.AES.encrypt( JSON.stringify( registroId ),pass ).toString().replace(/\+/g,'p1L2u3S').replace(/\//g,'bXaJN0921').replace(/=/g,'e1Q2u3A4l') }`);
                }
            });

        } catch (error) {
            // Maneja y notifica errores en el proceso de envío
            // Display error notification with SweetAlert2
            switch (error.response?.status) {
                case 422:
            Swal.fire({
                title: 'Error al guardar respuestas',
                text: `Ocurrió un problema: ${error.response?.data?.message || error.message || 'Error desconocido'}`,
                icon: 'error',
                confirmButtonColor: '#722F37',
                confirmButtonText: 'Ir a Inicio',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/');
                }
            });
            break;
            case 500:
                Swal.fire({
                    title: 'Error en el servidor',
                    text: 'Ocurrió un error interno. Por favor, inténtalo de nuevo.',
                    icon: 'error',
                    confirmButtonColor: '#722F37',
                    confirmButtonText: 'Aceptar',
                });
                break;
                default:
                    Swal.fire({
                        title: 'Error inesperado',
                        text: 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.',
                        icon: 'error',
                        confirmButtonColor: '#722F37',
                        confirmButtonText: 'Aceptar',
                    });
                    break;
            }
            //console.error('Error al enviar respuestas:', error);
        }
    };            


    if (status === 'loading') return <div className="text-center p-8">Cargando cuestionario...</div>;
    if (status === 'error') return <div className="text-center p-8 text-red-500">Error al cargar el cuestionario</div>;

    return (
        <div className="p-1 sm:p-5 shadow rounded bg-[#f5efe0]">
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Estudio Socioeconómico</h1>
                <p className="text-gray-600">Responde las siguientes preguntas</p>
            </header>

            {/* Column controls */}
            <div className="flex justify-end mb-4 space-x-2">
                <span className="text-sm text-gray-600 mr-2 self-center">Columnas:</span>
                <button 
                    onClick={() => setGridColumns(1)}
                    className={`px-3 py-1 text-sm rounded ${gridColumns === 1 ? 'bg-[#722F37] text-white' : 'bg-gray-200'}`}
                >
                    1
                </button>
                <button
                    onClick={() => setGridColumns(2)}
                    className={`hidden sm:block px-3 py-1 text-sm rounded ${gridColumns === 2 ? 'bg-[#722F37] text-white' : 'bg-gray-200'}`}
                >
                    2
                </button>
            </div>

            <div 
                className="grid gap-3" 
                style={{ 
                    gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))` 
                }}
            >
                {preguntas.map((pregunta) => (
                    <Question
                        key={pregunta.id}
                        pregunta={pregunta}
                        onAnswer={handleAnswer}
                        answers={answers}
                    />
                ))}
            </div>

            <div className="mt-8 text-center">
                <button
                    onClick={async () => {
                        Swal.fire({
                            title: 'Guardando...',
                            text: 'Por favor espera mientras se guardan tus respuestas.',
                            allowOutsideClick: false,
                            showConfirmButton: false,
                            willOpen: () => {
                                Swal.showLoading();
                            },
                        });
                        await handleSubmit();                       
                    }}
                    disabled={!allRequiredAnswered}
                    className={`px-6 py-3 ${allRequiredAnswered
                            ? 'bg-[#722F37] hover:bg-[#5a252b]'
                            : 'bg-gray-400 cursor-not-allowed'
                        } text-white rounded-lg transition-colors font-medium`}
                >
                    Enviar Respuestas
                </button>
                {!allRequiredAnswered && (
                    <p className="text-red-500 mt-2 text-sm">
                        Por favor complete todas las preguntas requeridas marcadas con *
                    </p>
                )}
            </div>
        </div>
    );
};



/**
 * Parsea el valor de una dependencia para obtener su formato correcto.
 * 
 * @param {any} value - El valor que se intenta parsear, podría ser un string JSON.
 * @returns {any} - Si el valor es un string en formato JSON válido, devuelve el objeto/valor 
 *                  parseado. Si no es un JSON válido, devuelve el valor original sin cambios.
 * 
 * Esta función intenta convertir strings en formato JSON a sus correspondientes
 * tipos de datos JavaScript (objeto, array, número, booleano, etc.).
 * Si el parseo falla (porque no es JSON válido), simplemente devuelve el valor original.
 */
const parseDependencyValue = (value) => {
    try {
            return JSON.parse(value);
    } catch {
            return value;
    }
};

/**
 * Compara si un valor actual coincide con un valor esperado según diferentes tipos de datos.
 * 
 * @param {any} actual - El valor actual que se está evaluando.
 * @param {any} expected - El valor esperado para comparar.
 * @returns {boolean} - Devuelve true si hay coincidencia según las reglas específicas para cada tipo de dato:
 *   - Si expected es un array, verifica si actual incluye alguno de los valores en expected.
 *   - Si actual es un booleano, compara si es igual a true.
 *   - Si actual y expected son strings, compara si son iguales ignorando mayúsculas/minúsculas.
 *   - Para otros tipos, convierte ambos valores a string y compara.
 */
const checkDependencyMatch = (actual, expected) => {
    if (Array.isArray(expected)) {
            return expected.some(e => actual?.includes(e));
    }
    if (typeof actual === 'boolean') {
            expected = true;
            return actual === expected;
    }
    if (typeof actual === 'string' && typeof expected === 'string') {
            return actual.toUpperCase() === expected.toUpperCase();
    }
    return actual?.toString() === expected?.toString();
};