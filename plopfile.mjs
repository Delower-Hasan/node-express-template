export default function (plop) {
  // Generator for CRUD (Model, Controller, and Route)
  plop.setGenerator('module', {
    description: 'Generate a full CRUD implementation',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter the module name (e.g., User):'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/modules/{{camelCase name}}/{{camelCase name}}.controller.ts',
        templateFile: 'templates/controller.hbs'
      },
      {
        type: 'add',
        path: 'src/app/modules/{{camelCase name}}/{{camelCase name}}.model.ts',
        templateFile: 'templates/model.hbs'
      },
      {
        type: 'add',
        path: 'src/app/modules/{{camelCase name}}/{{camelCase name}}.interface.ts',
        templateFile: 'templates/interface.hbs'
      },
      {
        type: 'add',
        path: 'src/app/modules/{{camelCase name}}/{{camelCase name}}.zod.ts',
        templateFile: 'templates/zod.hbs'
      },
      {
        type: 'add',
        path: 'src/app/modules/{{camelCase name}}/{{camelCase name}}.service.ts',
        templateFile: 'templates/service.hbs'
      },
      {
        type: 'add',
        path: 'src/app/modules/{{camelCase name}}/{{camelCase name}}.route.ts',
        templateFile: 'templates/route.hbs'
      },
      {
        type: 'append',
        path: 'src/app/routes/index.ts',
        pattern: /\/\/ End of route imports/,
        template: `import { {{pascalCase name}}Route } from '../modules/{{camelCase name}}/{{camelCase name}}.route';`
      },
      {
        type: 'append',
        path: 'src/app/routes/index.ts',
        pattern: /\/\/ End of route usage/,
        template: `AppRouter.use('/api/v1/{{kebabCase name}}', {{pascalCase name}}Route);`
      }
    ]
  })
  // Generate Controller
  plop.setGenerator('controller', {
    description: 'Create a new controller',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the controller (e.g., Blog)'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/modules/{{camelCase name}}/{{camelCase name}}.controller.ts',
        templateFile: 'templates/controller.hbs'
      }
    ]
  })

  // Generate Model
  plop.setGenerator('model', {
    description: 'Create a new model',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the model (e.g., Blog)'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/modules/{{camelCase name}}/{{camelCase name}}.model.ts',
        templateFile: 'templates/model.hbs'
      }
    ]
  })

  // Generate Interface
  plop.setGenerator('interface', {
    description: 'Create a new interface',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the interface (e.g., Blog)'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/modules/{{camelCase name}}/{{camelCase name}}.interface.ts',
        templateFile: 'templates/interface.hbs'
      }
    ]
  })

  // Generate Zod Validation
  plop.setGenerator('zod', {
    description: 'Create Zod validation for a new resource',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the resource (e.g., Blog)'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/modules/{{camelCase name}}/{{camelCase name}}.zod.ts',
        templateFile: 'templates/zod.hbs'
      }
    ]
  })

  // Generate Service
  plop.setGenerator('service', {
    description: 'Create a new service',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the service (e.g., Blog)'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/modules/{{camelCase name}}/{{camelCase name}}.service.ts',
        templateFile: 'templates/service.hbs'
      }
    ]
  })

  // Generate Route
  plop.setGenerator('route', {
    description: 'Create a new route',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the route (e.g., Blog)'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/modules/{{camelCase name}}/{{camelCase name}}.route.ts',
        templateFile: 'templates/route.hbs'
      }
    ]
  })

  // Generate Main Route Entry
  plop.setGenerator('main-route', {
    description: 'Create or update main route entry',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the route (e.g., Blog)'
      }
    ],
    actions: [
      {
        type: 'append',
        path: 'src/app/routes/index.ts',
        pattern: /\/\/ End of route imports/,
        template: `import { {{pascalCase name}}Route } from '../modules/{{camelCase name}}/{{camelCase name}}.route';`
      },
      {
        type: 'append',
        path: 'src/app/routes/index.ts',
        pattern: /\/\/ End of route usage/,
        template: `AppRouter.use('/api/v1/{{kebabCase name}}', {{pascalCase name}}Route);`
      }
    ]
  })
}
