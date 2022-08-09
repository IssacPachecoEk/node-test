// este apartado es para conceptos generales de grapsql
import {ApolloServer, gql} from 'apollo-server';
const personas  = [
    {
        id: 1,
        nombre: "Issac",
        edad: 24,
        sexo: "hombre",
        cuidad: "merida",
        estado: "yucatan",
        telefono: "9992284511"
    },
    {
        id: 2,
        nombre: "Mirna",
        edad: 53,
        sexo: "mujer",
        cuidad: "hoctun",
        estado: "yucatan"
    },
    {
        id: 3,
        nombre: "Victor",
        edad: 32,
        sexo: "hombre",
        cuidad: "chiapas",
        estado: "chiapas"
    }
]

const typeDefinitions = gql`
    type Direccion {
        cuidad: String!,
        estado: String!
    },
    type Persona {
        id: Int!,
        nombre: String!,
        edad: Int!,
        sexo: String!,
        direccion: Direccion!
    }
    type Query {
        total: Int!
        todosPersonas: [Persona],
        encontrarPersona(nombre: String!): Persona
    }`

const resolvers = {
        Query: {
            total: () => personas.length,
            todosPersonas: () => personas,
            encontrarPersona: (root,args) => {
                const {nombre} = args;
                return personas.find(persona => persona.nombre === nombre);
            }
        },
        Persona: {
            direccion: (root) => { 
            return {
                cuidad: root.cuidad,
                estado: root.estado
            }}
        }
}
const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers
});

server.listen().then(({url}) => {
    console.log('listening on port ' + url);
})