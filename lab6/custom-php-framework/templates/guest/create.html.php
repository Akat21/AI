<?php

/** @var \App\Model\Guest $guest */
/** @var \App\Service\Router $router */

$title = 'Create Guest';
$bodyClass = "edit";

ob_start(); ?>
    <h1>Create Guest</h1>
    <form action="<?= $router->generatePath('guest-create') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="guest-create">
    </form>

    <a href="<?= $router->generatePath('guest-index') ?>">Back to list</a>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
