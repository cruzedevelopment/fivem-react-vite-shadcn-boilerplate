fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author 'cruzedevelopment'
description 'A modern FiveM resource boilerplate featuring React 18, Vite, TypeScript, and shadcn/ui components'
version '1.0.0'

shared_scripts {
    '@ox_lib/init.lua',
    'shared/shared.lua'
}

client_scripts {
    'src/client/*.lua'
}

server_scripts {
    'src/server/*.lua'
}

ui_page 'web/build/index.html'

files {
  'web/build/index.html',
  'web/build/**/*'
}