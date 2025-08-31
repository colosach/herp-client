const errorToastConfig = {
  color: "error" as const,
  duration: 4000,
  closeIcon: "ph-x",
  icon: "ph-seal-warning",
}

import type { 
  FetchError 
} from 'ofetch'

// This is for warpping all api calls, for error handling or forwarding 
export const apiWrapper = async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
  try {
    return await apiCall()
  }
  catch (error: unknown) {
    const apiError = error as FetchError

    const toast = useToast()
    const { $i18n } = useNuxtApp()

    
    // Hanling for custom error thrown by interceptor, 
    // identified by key in `error.data` prop
    if (apiError.data === API_CLIENT_ERROR_KEY) {

      toast.add({ 
        title:  `[APWR - E]: ${$i18n.t("COMMON.errors.noInternetConnection.title")}`,
        description:  $i18n.t("COMMON.errors.noInternetConnection.description"),
        ...errorToastConfig,
        icon: "ph-wifi-x",
        close: { color: 'error' },
      })

      return null
    }

    // Handling for HTTP errors
    switch (apiError.statusCode) {
      case 401:
        // Handle auth
        break
      case 403:

        toast.add({ 
          title: `[APWR - E]: ${$i18n.t("COMMON.errors.unauthorized.title")}`,
          description: $i18n.t("COMMON.errors.unauthorized.description"),
          ...errorToastConfig,
          close: { color: 'error' }, 
        })
        break

      case 404:

        toast.add({ 
          title: `[APWR - E]: ${$i18n.t("COMMON.errors.notFound.title")}`,
          description: $i18n.t("COMMON.errors.notFound.description"),
          ...errorToastConfig,
          close: { color: 'error' },
        })
        break

      case 500:
        toast.add({ 
          title: `[APWR - E]: ${$i18n.t("COMMON.errors.server.title")}`,
          description: $i18n.t("COMMON.errors.server.description"),
        ...errorToastConfig,
        close: { color: 'error' },
        })
        break
      
    }
    
    throw error
  }
}