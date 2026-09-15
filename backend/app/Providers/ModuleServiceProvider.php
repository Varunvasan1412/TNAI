<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

class ModuleServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $modulesPath = app_path('Modules');

        if (File::exists($modulesPath)) {
            $this->loadModules($modulesPath, 'api');
        }
    }

    /**
     * Load modules recursively.
     */
    private function loadModules($path, $prefix)
    {
        $directories = File::directories($path);

        foreach ($directories as $directory) {
            $moduleName = basename($directory);
            $newPrefix = $prefix . '/' . strtolower($moduleName);

            // If a directory contains a "Controllers" folder, treat it as a module
            if (File::exists($directory . '/Controllers')) {
                
                // Load Views (Namespace: ModuleName)
                $viewsPath = $directory . '/Views';
                if (File::exists($viewsPath)) {
                    $this->loadViewsFrom($viewsPath, $moduleName);
                }

// Load API Routes
$apiRoutesPath = $directory . '/Routes/api.php';
if (File::exists($apiRoutesPath)) {
    Route::prefix($newPrefix)
        ->middleware('api')
        ->group($apiRoutesPath);
}

// Load Website API Routes (for the frontend website)
$websiteRoutesPath = $directory . '/Routes/website.php';
if (File::exists($websiteRoutesPath)) {
    Route::prefix($newPrefix . '/web')
        ->middleware('api')
        ->group($websiteRoutesPath);
}

// Image delete route without module prefix
$imageRoutesPath = $directory . '/Routes/api.php';
if (File::exists($imageRoutesPath)) {
    Route::prefix('api')
        ->middleware('api')
        ->group(function () use ($directory) {
            $controllerClass = 'App\\Modules\\Product\\Controllers\\ProductController';
            if (class_exists($controllerClass)) {
                Route::get('/product/image/delete/{id}', [$controllerClass, 'delete_product_image']);
            }
        });
}
                
                // Load Web Routes
                $webRoutesPath = $directory . '/Routes/web.php';
                if (File::exists($webRoutesPath)) {
                    $webPrefix = str_replace('api/', '', $newPrefix);
                    Route::middleware('web')
                        ->prefix($webPrefix)
                        ->group($webRoutesPath);
                }
            } else {
                // Recurse for nested modules
                $this->loadModules($directory, $newPrefix);
            }
        }
    }
}
